const {badhanAxios} = require('../../api');
const validate = require('jsonschema').validate;
const env = require('../../config');
const {processError} = require('../fixtures/helpers');
const postCallRecordsSchema={
    type: "object",
    additionalProperties: false,
    properties: {
        status: {type: "string"},
        statusCode: {const: 201},
        message: {type: "string"},
        callRecord: {
            type: "object",
            additionalProperties: false,
            properties:{
                date:{type:"integer"},
                _id:{type:"string"},
                callerId:{type:"string"},
                calleeId:{type:"string"},
                expireAt:{type:"string"}
            },
            required:["date","_id","callerId","calleeId","expireAt"]
        }
    },
    required: ["status", "statusCode", "message", "callRecord"]
}

const deleteCallRecordsSchema={
    type: "object",
    additionalProperties: false,
    properties: {
        status: {type: "string"},
        statusCode: {const: 200},
        message: {type: "string"},
        deletedCallRecord: {
            type: "object",
            additionalProperties: false,
            properties:{
                date:{type:"integer"},
                _id:{type:"string"},
                callerId:{type:"string"},
                calleeId:{type:"string"},
                expireAt:{type:"string"}
            },
            required:["date","_id","callerId","calleeId"]
        }
    },
    required: ["status", "statusCode", "message","deletedCallRecord"]
}

test('POST&DELETE/callrecords', async () => {
    try {

        //post/callrecords part

        let signInResponse = await badhanAxios.post('/users/signin', {
            phone: env.SUPERADMIN_PHONE,
            password: env.SUPERADMIN_PASSWORD
        });

        let donorResponse = await badhanAxios.get('/users/me', {
            headers: {
                "x-auth": signInResponse.data.token
            }
        });

        let recordCreationResponse = await badhanAxios.post("/callrecords",{
            donorId:donorResponse.data.donor._id,
        },{
            headers: {
                "x-auth": signInResponse.data.token
            }
        });

        let validationRecordResult = validate(recordCreationResponse.data, postCallRecordsSchema);

        expect(validationRecordResult.errors).toEqual([]);

        // delete/donations part

        let donationDeletionResponse = await badhanAxios.delete("/callrecords?donorId="+donorResponse.data.donor._id+"&callRecordId="+recordCreationResponse.data.callRecord["_id"],  {
            headers: {
                "x-auth": signInResponse.data.token
            }
        });

        let validationResult = validate(donationDeletionResponse.data,deleteCallRecordsSchema );
        expect(validationResult.errors).toEqual([]);

        await badhanAxios.delete('/users/signout', {
            headers: {
                "x-auth": signInResponse.data.token
            }
        });

    } catch (e) {
        throw processError(e);
    }
})

test('POST&DELETE/guest/callrecords', async () => {
    try {

        //post/callrecords part

        let recordCreationResponse = await badhanAxios.post("/guest/callrecords");

        let validationRecordResult = validate(recordCreationResponse.data, postCallRecordsSchema);

        expect(validationRecordResult.errors).toEqual([]);

        // delete/donations part

        let donationDeletionResponse = await badhanAxios.delete("/guest/callrecords?donorId=23455&callRecordId="+recordCreationResponse.data.callRecord["_id"]);

        let validationResult = validate(donationDeletionResponse.data,deleteCallRecordsSchema );

        expect(validationResult.errors).toEqual([]);


    } catch (e) {
        throw processError(e);
    }
})
