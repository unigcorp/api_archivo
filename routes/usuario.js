const express = require('express');
const router = express.Router();
const connect = require('../connection');
const token = require('../servicios/authentication');
const jwt = require('jsonwebtoken')

router.get('/get',token.vericarToken,(req,res)=>{
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
                    const response = {
                        correo:result[0].correo,
                        contrasena:result[0].contrasena
                    }
                    const acctoken = jwt.sign(response,process.env.ACCESS_TOKEN);
                    return res.status(200).json({token:acctoken,result});
                }
            }    
        }else{
            return res.status(500).json(err );
        }
    })
});
router.post('/signup',(req,res)=>{
    const data = req.body;
    query = "SELECT * FROM usuario WHERE correo=?";
    connect.query(query,[data.correo],(error,result)=>{
        if(!error){
            if(result.length<=0){
                query = "INSERT INTO usuario(nombre,apellidos,correo,contrasena) VALUES(?,?,?,?)";
                connect.query(query,[data.nombre,data.apellidos,data.correo,data.contrasena],(erro,result)=>{
                    if(!erro){
                        return res.status(200).json({message:"USUARIO REGISTRADO CORRECTAMENTE"})
                    }else{
                        return res.status(500).json(err);
                    }
                })
            }else{
                return res.status(400).json({message:"USUARIO YA EXISTE"})
            }
        }else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update',token.vericarToken,(req,res)=>{
    const data = req.body;
    query = "UPDATE usuario SET nombre=?,apellidos=?,contrasena=? WHERE id_usuario=?";
    connect.query(query,[data.nombre,data.apellidos,data.contrasena,data.id_usuario],(error,result)=>{
        if(!error){
            return res.status(200).json({message:"USUARIO ACTUALIZADO CORRECTAMENTE"})
        }else{
            return res.status(500).json(err);
        }
    })
});
router.delete("/delete/:ids",token.vericarToken,(req,res)=>{
    let dato = req.params.ids;
    query = "DELETE FROM usuario WHERE id_usuario=?";
    connect.query(query,[dato],(error,result)=>{
        if(!error){
            return res.status(200).json({message:"USUARIO ELIMINADO CON EXITO"})
        }else{
            return res.status(500).json(err);
        }
    })
});


module.exports = router