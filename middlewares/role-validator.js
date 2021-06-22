const { response, request } = require("express");
const User = require('../models/user');


const isAdminRole = (req = request, res = response, next) =>{

    if(!req.authUser){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin válidar el token primero'
        })
    }

    const { role, name } = req.authUser;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - no puede hacer eso`
        })
    }

    next();
}

const hasRole = (...roles) =>{

    return (req, res= response, next)=>{

        if(!req.authUser){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin válidar el token primero'
            })
        }

        if(!roles.includes(req.authUser.role)){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles: ${roles}`
            })
        }

        next();
    }
}

module.exports ={
    isAdminRole,
    hasRole
}