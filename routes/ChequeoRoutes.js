const Express = require('express');
const {
    AgregarChequeo,
    EditarChequeo,
    ObtenerChequeos,
    ObtenerChequeoPorId,
    ObtenerChequeosPorMicroCiclo,
    EliminarChequeo
} = require('../controllers/ChequeoController');

const router = Express.Router();

router.post('/RutaChequeo/AgregarChequeo', AgregarChequeo);
router.put('/RutaChequeo/EditarChequeo/:id', EditarChequeo);
router.get('/RutaChequeo', ObtenerChequeos);
router.get('/RutaChequeo/:id', ObtenerChequeoPorId);
router.get('/RutaChequeo/PorMicroCiclo/:microCicloId', ObtenerChequeosPorMicroCiclo);
router.delete('/RutaChequeo/:id', EliminarChequeo);

module.exports = router;
