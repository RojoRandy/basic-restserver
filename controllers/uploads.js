const path = require('path');
const fs = require('fs');
const {response} = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

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

    //Eliminar imágen previa
    if(model.img){
        //Borrar la imagen
        const imgPath = path.join(__dirname,'../uploads', collection, model.img);

        if(fs.existsSync(imgPath)){
            fs.unlinkSync(imgPath);
        }
    }

    const filename = await uploadFile(req.files, undefined, collection);

    model.img = filename;
    await model.save();

    res.json(model);
}


const updateImgCloudinary = async(req, res=response)=>{
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

    //Eliminar imágen previa
    if(model.img){
        const splitName = model.img.split('/');
        const name = splitName[splitName.length -1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.file;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    
    model.img = secure_url;
    await model.save();

    res.json(model);
}

const getImage=async(req, res=response)=>{

    const {id, collection} = req.params;

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

    //Eliminar imágen previa
    if(model.img){
        //Borrar la imagen
        const imgPath = path.join(__dirname,'../uploads', collection, model.img);

        console.log(imgPath);
        console.log(fs.existsSync(imgPath));
        if(fs.existsSync(imgPath)){
            return res.sendFile(imgPath);
        }
    }

    const imgPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(imgPlaceholder);
}


module.exports={
    getImage,
    postFile,
    updateImg,
    updateImgCloudinary
}