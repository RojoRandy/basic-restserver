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

const categoryByNameExists = async(category='')=>{
    const categoryName=category.toUpperCase();
    const categoryExists = await Category.findOne({name:categoryName, state:true});
    if(!categoryExists){
        throw new Error(`No existe la categoría ${category}, debe crearse primero para poder registrar un producto de esa categoría`);
    }
}

const productByIdExists = async(id)=>{
    const productExists = await Product.findById(id);
    if(!productExists){
        throw new Error(`No existe producto con el id: ${productExists}`);
    }
}

const productByNameExists = async(name='')=>{
    const productExists = await Product.findOne({name, state:true});
    if(productExists){
        throw new Error(`Ya existe un producto con el nombre ${productExists.name}`);
    }
}

module.exports = {
    categoryByIdExists,
    categoryByNameExists,
    emailExists,
    isValidRole,
    productByIdExists,
    productByNameExists,
    userByIdExists
}