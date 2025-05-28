const middleware = require('../src/middleware');
const { format } = require('../src/utils/db');
const controllers = require('./../src/controllers');

const updateUserSchema = {
    body: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'number'
            },
            name: {
                type: 'string'
            },
            salary: {
                type: 'number'
            },
            email:{
                type: 'string',
                format: 'email'
            },
            mobile: {
                type: 'number',
            }
        },
        additionalProperties: false,
    }
};
const addeUserSchema = {
    body: {
        type: 'object',
        required: ['id', 'email', 'mobile'],
        properties: {
            id: {
                type: 'number'
            },
            name: {
                type: 'string'
            },
            salary: {
                type: 'number'
            },
            email: {
                type: 'string',
                format: 'email'
            },
            mobile: {
                type: 'number',
            }
        },
        additionalProperties: false,
    }
};
async function userRouter(fastify, options){

    fastify.patch('/user', { schema: updateUserSchema, preHandler: [middleware.simpleMiddleware.mobileValidation] }, controllers.updateUser.updateUser);

    fastify.get('/users', controllers.retrieveUsers.retrieveUsers);

    fastify.get('/user/:id', { preHandler: [middleware.simpleMiddleware.idValidation] }, controllers.retrieveUsers.findUser);

    fastify.post('/user', {schema: addeUserSchema, preHandler: [middleware.simpleMiddleware.mobileValidation] }, controllers.addUser.addUser);

    fastify.delete('/user/:id', { preHandler: [middleware.simpleMiddleware.idValidation]}, controllers.deleteUser.deleteUser);
};

module.exports =  userRouter ;