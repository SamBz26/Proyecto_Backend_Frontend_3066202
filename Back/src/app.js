const express = require('express'); // esto sirve para importar express
const cors = require('cors'); // esto sirve para importar cors
const path = require('path'); // esto sirve para importar path
const app = express(); // esto sirve para crear una instancia de express

//middleware
app.use(cors()); // esto sirve para habilitar CORS
app.use(express.json({limit: '50mb'})); // esto sirve para parsear el cuerpo de las peticiones JSON
app.use(express.urlencoded({extended: true, limit: '50mb'})); // esto sirve para parsear el cuerpo de las peticiones URL-encoded

//Rutas
app.use('/api/equipos', require('./routes/equipos.routes')); // esto sirve para importar las rutas de equipos
module.exports = app; // esto sirve para exportar la aplicación