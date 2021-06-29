const {response} = require('express')

const uploadFile = (req, res = response)=>{
    res.json({
        msg: 'Cargando archivo...'
    })
}


module.exports={
    uploadFile
}