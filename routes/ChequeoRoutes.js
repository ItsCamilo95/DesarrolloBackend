const Express = require('express');
const {
    AgregarChequeo,
    EditarChequeo,
    ObtenerChequeos,
    ObtenerChequeoPorId,
    ObtenerChequeosPorEntrenamientoDiario,
    EliminarChequeo
} = require('../controllers/ChequeoController');

const router = Express.Router();

router.post('/RutaChequeo/AgregarChequeo', AgregarChequeo);
router.put('/RutaChequeo/EditarChequeo/:id', EditarChequeo);
router.get('/RutaChequeo', ObtenerChequeos);
router.get('/RutaChequeo/:id', ObtenerChequeoPorId);
router.get('/RutaChequeo/PorEntrenamientoDiario/:entrenamientoDiarioId', ObtenerChequeosPorEntrenamientoDiario);
router.delete('/RutaChequeo/:id', EliminarChequeo);

module.exports = router;
