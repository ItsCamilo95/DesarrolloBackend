const Express = require('express');
const {AgregarEntrenamientoFlash, EditarEntrenamientoFlash} = require('../controllers/EntrenamientoFlashController')

const router = Express.Router();

router.post('/RutaEntrenamientoFlash/AgregarEntrenamientoFlash', AgregarEntrenamientoFlash)
router.put('/RutaEntrenamientoFlash/EditarEntrenamientoFlash/:id', EditarEntrenamientoFlash)


module.exports = router;