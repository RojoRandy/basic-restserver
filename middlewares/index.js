
const validateFields = require('../middlewares/fields-validator');
const validateJWT = require('../middlewares/jwt-validator');
const validateRoles = require('../middlewares/role-validator');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}