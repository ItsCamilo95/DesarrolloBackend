const Express = require('express');
const {AgregarEntrenamientoDiario, EditarEntrenamientoDiario} = require('../controllers/EntrenamientoDiarioController')

const router = Express.Router();

router.post('/RutaEntrenamientoDiario/AgregarEntrenamientoDiario', AgregarEntrenamientoDiario)
router.put('/RutaEntrenamientoDiario/EditarEntrenamientoDiario/:id', EditarEntrenamientoDiario)


module.exports = router;