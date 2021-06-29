const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fields-validator');
const { postFile } = require('../controllers/uploads');

const router = Router();

router.post('/', postFile);

module.exports = router;