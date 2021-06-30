const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../middlewares');
const { postFile, updateImgCloudinary,getImage } = require('../controllers/uploads');
const {allowedCollection} = require('../helpers');

const router = Router();

router.post('/', [validateFileToUpload], postFile);

router.put('/:collection/:id',[
    validateFileToUpload,
    check('id','No es un ID válido').isMongoId(),
    check('collection').custom(c=> allowedCollection(c, ['users','products'])),
    validateFields
],updateImgCloudinary);

router.get('/:collection/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('collection').custom(c=> allowedCollection(c, ['users','products'])),
    validateFields
],getImage);

module.exports = router;