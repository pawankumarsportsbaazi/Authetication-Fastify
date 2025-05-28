const userRouter = require('./user.js');
// import userRouter from './user.js';

async function routes(fastify, options){
    fastify.register(userRouter,{ prefix: '/api'});
}

module.exports =  routes ;
