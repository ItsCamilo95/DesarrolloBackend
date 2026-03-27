const Express = require('express');
const {
    AgregarEntrenamientoDiario,
    EditarEntrenamientoDiario,
    ObtenerEntrenamientosDiarios,
    ObtenerEntrenamientoDiarioPorId,
    ObtenerEntrenamientosDiariosPorMicroCiclo,
    EliminarEntrenamientoDiario
} = require('../controllers/EntrenamientoDiarioController');

const router = Express.Router();

router.post('/RutaEntrenamientoDiario/AgregarEntrenamientoDiario', AgregarEntrenamientoDiario);
router.put('/RutaEntrenamientoDiario/EditarEntrenamientoDiario/:id', EditarEntrenamientoDiario);
router.get('/RutaEntrenamientoDiario', ObtenerEntrenamientosDiarios);
router.get('/RutaEntrenamientoDiario/:id', ObtenerEntrenamientoDiarioPorId);
router.get('/RutaEntrenamientoDiario/PorMicroCiclo/:microCicloId', ObtenerEntrenamientosDiariosPorMicroCiclo);
router.delete('/RutaEntrenamientoDiario/:id', EliminarEntrenamientoDiario);

module.exports = router;
