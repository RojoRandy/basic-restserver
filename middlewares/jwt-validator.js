
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT =  async(req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token de autorización'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //busca un usuario con el uid recuperado
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en base de datos'
            })
        }

        //Verifica que el usuario este activo
        if(!user.state){
            return res.status(401).json({
                msg: 'Token no válido - Usuario desactivado'
            })
        }

        req.authUser = user;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validateJWT
}