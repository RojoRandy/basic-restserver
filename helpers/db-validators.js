const {Role, User, Category, Product} = require('../models');

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
        throw new Error(`No existe usuario con el id: ${id}`);
    }
}

const categoryByIdExists = async(id)=>{
    const categoryExists = await Category.findById(id);
    if(!categoryExists){
        throw new Error(`No existe categoria con el id: ${categoryExists}`);
    }
}

const productByIdExists = async(id)=>{
    const productExists = await Product.findById(id);
    if(!productExists){
        throw new Error(`No existe producto con el id: ${productExists}`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIdExists,
    categoryByIdExists,
    productByIdExists
}