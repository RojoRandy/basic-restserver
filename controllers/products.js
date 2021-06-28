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
        Product.countDocuments(query),
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
        const {state, user ,...body} = req.body;

        const data = {
            name: body.name.toUpperCase(),
            user: req.authUser._id,
            ...body
        }

        const product = new Product(data);
        await product.save();

        return res.json(product);
        
    } catch (error) {
        return res.status(400).json({
            msg: `No se pudo crear el producto`
        });
        
    }
}

const updateProduct = async(req, res=response)=>{
    
    try {
        const {id} = req.params;
        const {state, user ,...data} = req.body;

        const categoryDB = await Category.findOne({name:category})

        if(data.name){
            data.name = data.name.toUpperCase();
        }

        data.user = req.authUser._id;

        const product = await Product.findByIdAndUpdate(id, data, {new:true})
                                    .populate('user','name')
                                    .populate('category','name');

        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            msg: `No se pudo actualizar el producto`
        });        
    }
}

//TODO: deleteCategory - logic
const deleteProduct = async(req, res=response)=>{

    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{state:false},{new:true});

    return res.json(product)
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}