const Express = require('express');
const {AgregarChequeo, EditarChequeo} = require('../controllers/ChequeoController');

const router = Express.Router();

router.post('/RutaChequeo/AgregarChequeo', AgregarChequeo)
router.put('/RutaChequeo/EditarChequeo/:id', EditarChequeo)


module.exports = router;