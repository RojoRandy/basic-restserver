const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role='')=>{
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const emailExists = async(email='')=>{
    const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error(`Ya existe un usuario con el correo: ${email}`);
    }
}

const userByIdExists = async(id)=>{
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El id: ${id}, no existe`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIdExists
}