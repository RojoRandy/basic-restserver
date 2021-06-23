const {response} = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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

const googleSignIn = async (req, res=response)=>{

    const {id_token} = req.body;

    try {
        
        const {name, email, img} = await googleVerify(id_token);
        let user = await User.findOne({email});
        

        if(!user){
            //Crear al usuario
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //if user is enabled in DB
        if(!user.state){
            return res.status(401).json({
                msg: 'Contactar a soporte, el usuario se encuentra dado de baja'
            })
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}