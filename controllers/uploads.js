const path = require('path');
const {v4: uuidv4} = require('uuid')
const {response} = require('express');

const {uploadFile} = require('../helpers')


const postFile = async(req, res = response)=>{
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({msg: 'No existen archivos para subir'});
      return;
    }

    try {
        const filename = await uploadFile(req.files, undefined, 'imgs');
        res.json({filename})
    } catch (error) {
        res.status(400).json({msg: error})
        
    }

}


module.exports={
    postFile
}