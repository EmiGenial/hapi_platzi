'use strict'

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '172.17.0.2'
})

async function init(){
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return 'Welcome to Hapi Framework, for NodeJS '
        } 
    })

    try {
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Servidor corriendo en: ${server.info.uri}`);
}

init()