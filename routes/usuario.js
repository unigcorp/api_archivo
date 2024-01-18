const express = require('express');
const router = express.Router();
const connect = require('../connection');


router.get('/get',(req,res)=>{
     query = "SELECT * FROM usuario";
     connect.query(query,(err,rest)=>{
        if(!err){
            return res.status(200).json(rest);
        }else{
            return res.status(500).json(err);
        }
     })
});
router.post('/login',(req,res)=>{
    const data = req.body;
    query = "SELECT * FROM usuario WHERE correo = ? AND contrasena = ?";
    console.log('=====',data)
    connect.query(query,[data.correo,data.contrasena],(err,result)=>{
        if(!err){
            if(result.length <=0 || result[0].contrasena != data.contrasena){
                return res.status(401).json({message:"El usario o contrasena no son correctos"});
            }else{
                if(result[0].contrasena == data.contrasena){
                    return res.status(200).json(result);
                }
            }    
        }else{
            return res.status(500).json(err );
        }
    })
});

module.exports = router