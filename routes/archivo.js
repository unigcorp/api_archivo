//listar los archivos 
//listar los archivos por usuario
//actualizar el estatus por achivo
const express = require('express');
const router = express.Router();
const connect = require('../connection');
const token = require('../servicios/authentication');
const jwt = require('jsonwebtoken');


router.post('/request',token.vericarToken,(req,res)=>{
    const data = req.body;
    query = "SELECT * FROM usuario,solicitud,archivo WHERE usuario.id_usuario=solicitud.id_usuario AND solicitud.id_archivo=archivo.id_archivo AND solicitud.id_usuario=?";
    connect.query(query,[data.id_usuario],(erro,result)=>{
        if(!erro){
            return res.status(200).json({result});
        }else{
            return res.status(500).json(erro);
        }
    })
})

module.exports = router
