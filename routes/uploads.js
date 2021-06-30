const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../middlewares');
const { postFile, updateImg } = require('../controllers/uploads');
const {allowedCollection} = require('../helpers');

const router = Router();

router.post('/', [validateFileToUpload], postFile);

router.put('/:collection/:id',[
    validateFileToUpload,
    check('id','No es un ID válido').isMongoId(),
    check('collection').custom(c=> allowedCollection(c, ['users','products'])),
    validateFields
],updateImg);

module.exports = router;