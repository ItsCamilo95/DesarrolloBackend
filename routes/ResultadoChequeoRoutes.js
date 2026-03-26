const Express = require('express');
const {AgregarResultadoChequeo, EditarResultadoChequeo} = require('../controllers/ResultadoChequeoController');

const router = Express.Router();

router.post('/RutaChequeo/AgregarResultadoChequeo', AgregarResultadoChequeo)
router.put('/RutaChequeo/EditarResultadoChequeo/:id', EditarResultadoChequeo)


module.exports = router;