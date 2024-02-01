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
});
router.get('/get',token.vericarToken,(req,res)=>{
    query = "SELECT * FROM archivo";
    connect.query(query,(erro,result)=>{
        if(!erro){
            return res.status(200).json({result});
        }
        else{
            return res.status(500).json(erro);
        }
    })
});
router.patch('/update',token.vericarToken,(req,res)=>{
    const data = req.body; 
    query = "UPDATE solicitud SET id_usuario=?,id_archivo=?,status='EN PROCESO' WHERE id_sol=?";
    connect.query(query,[data.id_usuario,data.id_archivo,data.id_sol],(error,result)=>{
        if(!error){
            return res.status(200).json({message:"ARCHIVO ACTUALIZADO CORRECTAMENTE"})
        }else{
            return res.status(500).json(error);
        }
    })
});
//ruta , endpoint  para eliminar
router.delete("/delete/:ids",token.vericarToken,(req,res)=>{
    let dato = req.params.ids;
    query = "DELETE FROM solicitud WHERE id_sol=?";
    connect.query(query,[dato],(error,result)=>{
        if(!error){
            return res.status(200).json({message:"USUARIO ELIMINADO CON EXITO"})
        }else{
            return res.status(500).json(err);
        }
    })
});
router.post('/add',token.vericarToken,(req,res)=>{
    const dato = req.body;
    query = "INSERT INTO solicitud(id_usuario,id_archivo,status) VALUES(?,?,'EN PROCESO')";
    connect.query(query,[dato.id_usuario,dato.id_archivo],(error,result)=>{
        if(!error){
            return res.status(200).json({message:"ARCHIVO SE SOLICITO CORRECTAMENTE"})
        }
        else{
            return res.status(500).json(error);
        }
    })
})

module.exports = router
