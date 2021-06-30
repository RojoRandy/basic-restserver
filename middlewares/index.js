
const validateFields = require('./fields-validator');
const validateJWT = require('./jwt-validator');
const validateRoles = require('./role-validator');
const validateFiles = require('./file-validator')

module.exports = {
    ...validateFields,
    ...validateFiles,
    ...validateJWT,
    ...validateRoles
}