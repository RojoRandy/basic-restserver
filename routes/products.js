const {Router} = require('express');
const { check } = require('express-validator');
const { 
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const {isValidRole, productByIdExists} = require('../helpers/db-validators')

const router = Router();

//Obtener todas las category - Publico - populate
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields
], getProduct);

//Obtener  categorias - publico - paginado - total - populate
//TODO: Validate ID with helpers
router.get('/', getProducts);

//Crear categoria - privado - cualquier persona con token válido
router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio y debe ser mayor o igual a cero').isFloat({min}),
    check('category','El nombre de la categoría es obligatoria').not().isEmpty(),
    validateFields
], createCategory)

//Actualizar categoria - privado - cualquier persona con token válido
router.put('/:id', [
    validateJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(categoryByIdExists),
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateFields    
], updateCategory)

//Borrar una categoria - Admin
router.delete('/:id', [
    validateJWT,    //Verifica que el usuario tenga token válido
    check('id','No es un ID válido').isMongoId(), //Verifica que el id sea válido
    check('id').custom(categoryByIdExists), //Verifica que exista una categoria con ese id
    check('role').custom(isValidRole), //Verifica que el rol del usuario que quiere eliminar la categoria tenga un id válido
    check('role').custom(isAdminRole), //verifica que el rol del usuario sea ADMIN_ROLE
    validateFields //Verifica que todos los 
], deleteCategory)

module.exports = router;