const Express = require('express');
const {
    AgregarResultadoChequeo,
    EditarResultadoChequeo,
    ObtenerResultadosChequeo,
    ObtenerResultadoChequeoPorId,
    ObtenerResultadosPorChequeo,
    EliminarResultadoChequeo
} = require('../controllers/ResultadoChequeoController');

const router = Express.Router();

router.post('/RutaChequeo/AgregarResultadoChequeo', AgregarResultadoChequeo);
router.put('/RutaChequeo/EditarResultadoChequeo/:id', EditarResultadoChequeo);
router.get('/RutaChequeo', ObtenerResultadosChequeo);
router.get('/RutaChequeo/:id', ObtenerResultadoChequeoPorId);
router.get('/RutaChequeo/PorChequeo/:chequeoId', ObtenerResultadosPorChequeo);
router.delete('/RutaChequeo/:id', EliminarResultadoChequeo);

module.exports = router;
