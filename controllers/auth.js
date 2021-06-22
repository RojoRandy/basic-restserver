const {response} = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');

const login = async(req, res = response) =>{

    const {email, password} = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg:'No existe un usuario con ese correo'
            })
        }
        
        //Verificar si el usuario esta activo
        if(!user.state){
            return res.status(400).json({
                msg:'El usuario esta desactivado'
            })
        }

        //Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, user.password);

        if(!validaPassword){
            return res.status(400).json({
                msg:'La contraseña es incorrecta'
            })
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ponerse en contacto con el administrador del sistema'
        })
    }
}

module.exports = {
    login
}