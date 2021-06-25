const { validationResult } = require('express-validator');

//Regresa la respuesta de todos los errores encontrados en las verificaciones de las rutas
const validateFields=(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

module.exports={
    validateFields
}