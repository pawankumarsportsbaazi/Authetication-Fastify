async function simpleMiddleware(fastify, options) {
    fastify.addHook('onRequest', async (req, res) => {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    })
}

async function mobileValidation(request, reply) {
    const { mobile } = request.body;

    if (mobile && (typeof mobile !== 'number' || mobile.toString().length !== 10)) {
        return reply.code(400).send({ error: "Mobile number must be exactly 10 digits" });
    }
}

async function idValidation(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.code(400).send({ error: "ID is must!" });
    }
}

module.exports = { simpleMiddleware, mobileValidation, idValidation };