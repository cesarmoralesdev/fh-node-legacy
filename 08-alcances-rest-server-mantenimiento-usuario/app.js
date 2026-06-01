// Declaracion necesaria para usar las variables de entorno en las lineas posteriores
require('dotenv').config();
// Clase Server tendra la configuracion de nuestro servidor que esta en una clase
const Server = require('./models/server');
// Objeto server que se instancia de la clase Server
const server = new Server();
// Funcion que escuha el puerto de mi servidor
server.listen();