const { response } = require("express");
const {Category} = require('../models');


//TODO: getCategory - populate
const getCategory = async(req, res=response)=>{

    const {id} = req.params;
    const category = await Category.findById(id).populate('user','name');

    res.json(category)
}

//TODO: getCategories - paginate - total - populate (mongoose)
const getCategories = async(req, res=response)=>{

    const {limit=5, skip=0} = req.query;
    const query = {state:true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .populate('user','name')
                .skip(Number(skip))
                .limit(Number(limit))
    ]);

    res.json({
        total, 
        categories
    })
}

const createCategory = async(req,res=response) =>{

    try {
        const name = req.body.name.toUpperCase();
        const categoryExists = await Category.findOne({name});
    
        if(categoryExists){
            return res.status(400).json({
                msg: `La categoria ${categoryExists.name} ya existe`
            });
        }

        //Generate data to save
        const data ={
            name,
            user: req.authUser._id
        }
    
        const category = new Category(data);
        await category.save();
    
        return res.json({
            msg: 'Categoria creada'
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: `No se pudo guardar la categoria`
        });
        
    }
}

//TODO: updateCategory - validate name duplicated
const updateCategory = async(req, res=response)=>{
    
    const {id} = req.params;
    const {name} = req.body;

    const data = {
        name: name.toUpperCase(),
        user: req.authUser._id
    }

    const categoryExists = await Category.findOne({name});
    
    if(categoryExists){
        return res.status(400).json({
            msg: `El nombre de la categoria ${categoryExists.name} ya existe`
        });
    }
    
    
    const category = await Category.findByIdAndUpdate(id, data, {new: true}).populate('user','name');

    res.json(category)
}

//TODO: deleteCategory - logic
const deleteCategory = async(req, res=response)=>{

    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id,{state:false},{new:true});

    res.json(category)
}

module.exports = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}