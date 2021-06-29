const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadFile = (files, allowedExtensions=['png', 'jpg', 'jpeg', 'gif'], folder='') =>{
    
    return new Promise((resolve, reject)=>{

        const {file} = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length-1];
    
        //validar extensiones
        if(!allowedExtensions.includes(extension)){
            reject(`La extensión ${extension} no es permitida. Extensiones permitidas: ${allowedExtensions}`);
        }
      
        const filename = uuidv4()+'.'+extension;    
        const uploadPath = path.join(__dirname,'../uploads/', folder,filename);
      
        file.mv(uploadPath, function(err) {
            if (err) {
            reject(err);
            }
        
            resolve(filename);
        });

    });
}

module.exports = {
    uploadFile
}