const { response, json } = require("express");
const {Product, Category} = require('../models');


const getProduct = async(req, res=response)=>{

    const {id} = req.params;
    const product = await Product.findById(id)
                                 .populate('user','name')
                                 .populate('Category','name');

    res.json(product)
}

const getProducts = async(req, res=response)=>{

    const {limit=5, skip=0} = req.query;
    const query = {state:true};

    const [total, products] = await Promise.all([
        s.countDocuments(query),
        Product.find(query)
                .populate('user','name')
                .populate('category','name')
                .skip(Number(skip))
                .limit(Number(limit))
    ]);

    res.json({
        total, 
        products
    })
}

const createProduct = async(req,res=response) =>{

    try {
        const {name,price,category,description, available} = req.body;
        
        const productExists = await Products.findOne({name});

        if(productExists){
            res.status(400).json({
                msg:`Ya existe un producto con el nombre ${productExists.name}`
            })
        }

        const categoryExists = await Category.findOne({category});

        if(!categoryExists){
            res.status(400).json({
                msg: `No existe la categoría ${category}, debe crearse primero para poder registrar un producto de esa categoría`
            })
        }

        const data = {
            name,
            user: req.authUser._id,
            price,
            category: categoryExists._id,
            description,
            available
        }

        const product = new Product(data);
        product.save();

        return res.json(product);
        
    } catch (error) {
        return res.status(400).json({
            msg: `No se pudo crear el producto`
        });
        
    }
}

const updateProduct = async(req, res=response)=>{
    
    res.json({
        msg: "UPDATE"
    })
}

//TODO: deleteCategory - logic
const deleteProduct = async(req, res=response)=>{

    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{state:false},{new:true});

    res.json(product)
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}