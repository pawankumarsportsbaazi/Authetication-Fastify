const fastify = require('fastify')({ logger: true });
require('dotenv').config();

// Middleware
const authMiddleware = require('./src/middleware');
fastify.register(authMiddleware.simpleMiddleware.simpleMiddleware);


// Routes
const routes = require('./routes');
fastify.register(routes);

module.exports = fastify;
