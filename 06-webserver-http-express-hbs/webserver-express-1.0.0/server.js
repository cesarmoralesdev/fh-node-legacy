require('dotenv').config();
const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

// Usa la carpeta public para hacer disponibles nuestros recurso ubicados en la carpetas public, tales como los assets y el html de ejemplo
app.use(express.static(__dirname + '/public'));

// Express HBS engine
// Registramos las vistas parciales de hbs
hbs.registerPartials(__dirname + '/views/parciales');
// Usamos hbs para gestionar las vistas
app.set('view engine', 'hbs');

// Rutas que devuelve solo html, este es un ejemplo que no usa hbs, solo para demo
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-old.html'));
});

//Rutas que usan recursos hbs
app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'fernando'
    });
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});