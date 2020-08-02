'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')

const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '172.17.0.2',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init(){

    try {
        await server.register(inert);
        // Servimos el index.html
        server.route({
            method: 'GET',
            path: '/home',
            handler: (req, h) => {
                return h.file('index.html')
            } 
        })
    
        // Servimos los estaticos .css y .png
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    index: ['index.html']
                }
            }
        })

        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Servidor corriendo en: ${server.info.uri}`);
}

init()