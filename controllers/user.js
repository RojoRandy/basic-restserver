const {request, response} = require('express')

const getUser = (req=request,res = response)=>{

    const {q, nombre="noname", apikey, page=1, limit=5} = req.query;
    res.json({
        msg: 'get API - User Controller',
        q, 
        nombre, 
        apikey, 
        page, 
        limit
    })
}

const postUser = (req,res = response)=>{
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - User Controller',
        nombre, edad
    })
}

const putUser = (req,res = response)=>{
    const {id}=req.params;
    res.json({
        msg: 'put API - User Controller',
        id
    })
}

const patchUser = (req,res)=>{
    res.json({
        msg: 'patch API - User Controller'
    })
}

const deleteUser = (req,res = response)=>{
    res.json({
        msg: 'delete API - User Controller'
    })
}

module.exports={
    getUser,
    putUser,
    postUser,
    patchUser,
    deleteUser
}