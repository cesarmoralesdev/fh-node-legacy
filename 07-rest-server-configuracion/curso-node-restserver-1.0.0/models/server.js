const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        // Configuracion inicial
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    middlewares() {
        // CORS usado para dar acceso a mi servidor desde un origen conocido
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));
    }
    routes() {
        // Expone las rutas de usuario 
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    listen() {
        // Escucha el servidor en el puerto de mi variable de entorno
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
module.exports = Server;