const {badhanAxios} = require('../../../api');
const validate = require('jsonschema').validate;
const env = require('../../../config');
const {processError}=require('../../fixtures/helpers')
const {signOutSchema} = require('./schemas')

test('DELETE/users/signOut: success', async () => {
    try {
        let signInResponse = await badhanAxios.post('/users/signin',{
            phone:env.SUPERADMIN_PHONE,password: env.SUPERADMIN_PASSWORD
        });
        let signOutResponse = await badhanAxios.delete('/users/signout', {
            headers: {
                "x-auth": signInResponse.data.token
            }
        });
        let validationResult = validate(signOutResponse.data,signOutSchema);
        expect(validationResult.errors).toEqual([]);
    }catch (e) {
        throw processError(e);
    }
})


