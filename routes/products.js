const {Router} = require('express');
const { check } = require('express-validator');
const { 
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');
const { validateJWT, validateFields, isAdminRole, hasRole } = require('../middlewares');
const {isValidRole, productByIdExists, categoryByNameExists, productByNameExists, categoryByIdExists} = require('../helpers/db-validators')

const router = Router();

router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields
], getProduct);

router.get('/', getProducts);

router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name',).custom(productByNameExists),
    check('price', 'El precio es obligatorio y debe ser mayor o igual a cero').isFloat({min:0}),
    check('category','No es un ID válido').isMongoId(),
    check('category').custom(categoryByIdExists),
    validateFields
], createProduct)

router.put('/:id', [
    validateJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields    
], updateProduct)

router.delete('/:id', [
    validateJWT,    //Verifica que el usuario tenga token válido
    isAdminRole, //verifica que el rol del usuario sea ADMIN_ROLE
    check('id','No es un ID válido').isMongoId(), //Verifica que el id sea válido
    check('id').custom(productByIdExists), //Verifica que exista una categoria con ese id
    validateFields //Verifica que todos los 
], deleteProduct)

module.exports = router;