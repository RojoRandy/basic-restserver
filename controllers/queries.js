const {response} = require('express');
const {ObjectId} = require('mongoose').Types;
const {User, Category, Product} = require('../models')

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users'
]

const searchUsers = async(term='', res=response)=>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const user = await User.findById(term);

        return res.json({
            results: (user) ? [user] : []
        })
    }
    
    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state:true}]
    });

    res.json({
        results: users
    })
}

const searchCategories = async(term='', res=response)=>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const category = await Category.findById(term);

        return res.json({
            results: (category) ? [category] : []
        })
    }
    
    const regex = new RegExp(term, 'i');

    const categories = await Category.find({name: regex, state:true});

    res.json({
        results: categories
    })
}

const searchProducts = async(term='', res=response)=>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const product = await Product.findById(term)
                                    .populate('category','name');

        return res.json({
            results: (product) ? [product] : []
        })
    }
    
    const regex = new RegExp(term, 'i');

    const products = await Product.find({name: regex, state:true})
                                    .populate('category','name');

    res.json({
        results: products
    })
}

const search = (req, res=response)=>{

    const {collection, term} = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collectionsAllowed}`
        })
    }

    switch(collection){
        case 'categories': 
            searchCategories(term, res);
        break;
        case 'products': 
            searchProducts(term, res);
        break;
        case 'roles': break;
        case 'users': 
            searchUsers(term, res);
        break;
        default:
            return res.status(500).json({
                msg: 'No se ha implementado la busqueda de esa colección, por favor notificar a soporte'
            })
    }
}

module.exports = {
    search
}