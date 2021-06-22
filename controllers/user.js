const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req=request,res = response)=>{

    // const {q, nombre="noname", apikey, page=1, limit=5} = req.query;
    const {limit=5, skip=0} = req.query;
    const query={state:true};

    const [total, users] =await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const postUser = async(req,res = response)=>{
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});    

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await user.save();

    res.json({user});
}

const putUser = async(req,res = response)=>{
    const {id}=req.params;
    const {_id, password, google, email, ...rest } = req.body;

    ///TODO: validar contra BD
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest );

    res.json({user});
}

const patchUser = (req,res)=>{
    res.json({
        msg: 'patch API - User Controller'
    });
}

const deleteUser = async(req,res = response)=>{

    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {state: false});
    const authUser = req.authUser;
    
    res.json({
        user,
        authUser
    });
}

module.exports={
    getUsers,
    putUser,
    postUser,
    patchUser,
    deleteUser
};