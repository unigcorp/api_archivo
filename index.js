const express = require('express');
var cors = require('cors');
const conect = require('./connection');

const usuarioRuta = require('./routes/usuario');

const app = express();


app.use(cors());
//app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user',usuarioRuta);

module.exports = app;
