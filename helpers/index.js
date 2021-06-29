
const dbValidators = require('./db-validators');
const uploadFile = require('./upload-file');
const googleVerify = require('./google-verify');
const jwt = require('./jwt');


module.exports = {
    ...dbValidators,
    ...uploadFile,
    ...googleVerify,
    ...jwt
}