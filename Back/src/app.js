const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

//middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

//Rutas
app.use('/api/equipos', require('./routes/equipos.routes'));
module.exports = app;