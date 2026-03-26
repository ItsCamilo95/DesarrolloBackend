const Express = require('express');
const {
    AgregarEntrenamientoFlash,
    EditarEntrenamientoFlash,
    ObtenerEntrenamientosFlash,
    ObtenerEntrenamientoFlashPorId,
    EliminarEntrenamientoFlash
} = require('../controllers/EntrenamientoFlashController');

const router = Express.Router();

router.post('/RutaEntrenamientoFlash/AgregarEntrenamientoFlash', AgregarEntrenamientoFlash);
router.put('/RutaEntrenamientoFlash/EditarEntrenamientoFlash/:id', EditarEntrenamientoFlash);
router.get('/RutaEntrenamientoFlash', ObtenerEntrenamientosFlash);
router.get('/RutaEntrenamientoFlash/:id', ObtenerEntrenamientoFlashPorId);
router.delete('/RutaEntrenamientoFlash/:id', EliminarEntrenamientoFlash);

module.exports = router;
