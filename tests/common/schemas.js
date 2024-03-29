const jwtInvalidSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 401},
        message:{ const : 'Invalid Authentication'}
    },
    required:["status","statusCode","message"]
}
const expiredTokenSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 401},
        message:{ const : 'You have been logged out'}
    },
    required:["status","statusCode","message"]
}

const routeNotFoundErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 404},
        message:{ const : 'Route not found'}
    },
    required:["status","statusCode","message"]
}

const jsonBodyParseErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 400},
        message:{ const : 'Malformed JSON'}
    },
    required:["status","statusCode","message"]
}

const internalServerErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "EXCEPTION"},
        statusCode: { const: 500},
        message:{ const : 'UNCAUGHT ERROR: undefined'},
        details: {
            type: "object",
            additionalProperties:false,
            properties: {
                dummy:{ const: "intentional internal server error"},
            },
            required:["dummy"]
        }
    },
    required:["status","statusCode","message","details"]
}

const superAdminPermissionErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 403},
        message:{ const : 'You are not permitted to access this route'}
    },
    required:["status","statusCode","message"]
}

const hallAdminPermissionErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 403},
        message:{ const : 'Only hall admins or above can access this route'}
    },
    required:["status","statusCode","message"]
}

const higherDesignationPermissionErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 403},
        message:{ const : 'You cannot modify the details of a Badhan member with higher designation'}
    },
    required:["status","statusCode","message"]
}

const sameHallPermissionErrorSchema = {
    type: "object",
    additionalProperties:false,
    properties: {
        status:{ const: "ERROR"},
        statusCode: { const: 403},
        message:{ const : 'You are not authorized to access a donor of different hall'}
    },
    required:["status","statusCode","message"]
}

module.exports = {
    jwtInvalidSchema,
    expiredTokenSchema,
    routeNotFoundErrorSchema,
    jsonBodyParseErrorSchema,
    internalServerErrorSchema,
    superAdminPermissionErrorSchema,
    hallAdminPermissionErrorSchema,
    higherDesignationPermissionErrorSchema,
    sameHallPermissionErrorSchema
}
