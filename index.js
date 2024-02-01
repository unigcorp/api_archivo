const express = require('express');
var cors = require('cors');
const conect = require('./connection');

const usuarioRuta = require('./routes/usuario');
const archivoRuta = require('./routes/archivo');

const app = express();


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/nombre_carpeta_creada/user',usuarioRuta);
app.use('/file',archivoRuta);
module.exports = app;
