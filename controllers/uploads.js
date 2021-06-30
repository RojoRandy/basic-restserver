const {response} = require('express');

const {uploadFile} = require('../helpers')
const {User, Product} = require('../models')


const postFile = async(req, res = response)=>{
  
    try {
        const filename = await uploadFile(req.files, undefined, 'imgs');
        res.json({filename})
    } catch (error) {
        res.status(400).json({msg: error})
        
    }

}


const updateImg = async(req, res=response)=>{

    const {id, collection} = req.params

    let model;

    switch(collection){
        case 'users':
            model = await User.findById(id);

            if(!model){
                return res.status(400).json({
                    msg: `No existe usuario con el id: ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);

            if(!model){
                return res.status(400).json({
                    msg: `No existe producto con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Colección no válidada'})
    }

    const filename = await uploadFile(req.files, undefined, collection);

    model.img = filename;
    await model.save();

    res.json(model);
}


module.exports={
    postFile,
    updateImg
}