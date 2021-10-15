const {badhanAxios} = require('../../api');
const validate = require('jsonschema').validate;
const env = require('../../config/config');
const {processError}=require('../fixtures/helpers');

test('GET/log/date/{date}',async()=>{
    try {
        let signInResponse = await badhanAxios.post('/users/signin', {
            phone: "8801521438557",
            password: env.MAHATHIR_PASSWORD
        });

        const date=new Date().getTime();

        let response = await badhanAxios.get('/log/date/'+date,{
            headers:{
                "x-auth":signInResponse.data.token
            }
        });


        let validationResult = validate(response.data, {
            type: "object",
            additionalProperties: false,
            properties: {
                "status": {type: "string"},
                "statusCode": {const: 200},
                "message": {type: "string"},
                "logs": {
                    type:"array",
                    items: {
                        type:"object",
                        additionalProperties: false,
                        properties: {
                            "donorId": {type: "string"},
                            "hall": {type: "number"},
                            "name": {type: "string"},
                            "count":{type:"number"}
                        },
                        required: ["donorId", "hall", "name","count"]
                    }
                }
            },
            required: ["status", "statusCode", "message","logs"]
        });

        expect(validationResult.errors).toEqual([]);

        await badhanAxios.delete('/users/signout', {
            headers: {
                "x-auth": signInResponse.data.token
            }
        });

    }catch (e) {
        throw processError(e);
    }
})