'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const handlebars = require('handlebars')
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
        // registramos las utilidades 
        await server.register(inert)
        await server.register(vision)

        // Configuramos las vistas
        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        // Servimos el index.html
        server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                return h.view('index', {
                    title: 'home',
                })
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