
const {Router} = require('express');
const { check } = require('express-validator');

const {
    getUsers,
    putUser,
    postUser,
    patchUser,
    deleteUser
} = require('../controllers/user');

const { validateFields } = require('../middlewares/fields-validator');
const { isValidRole, emailExists ,userByIdExists } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.post('/', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener más de 6 letras').isLength({min: 6}),
    check('email','El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    // check('role','No es rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
]
, postUser);

router.patch('/', patchUser);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], deleteUser);


module.exports = router;