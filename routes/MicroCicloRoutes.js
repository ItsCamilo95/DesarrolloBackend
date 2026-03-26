const Express = require('express');
const {
    CrearMicroCiclo,
    EditarMicroCiclo,
    ObtenerMicroCiclos,
    ObtenerMicroCicloPorId,
    ObtenerMicroCiclosPorMesoCiclo,
    EliminarMicroCiclo
} = require('../controllers/MicroCicloController');

const router = Express.Router();

router.post('/RutaMicroCiclo/CrearMicroCiclo', CrearMicroCiclo);
router.put('/RutaMicroCiclo/EditarMicroCiclo/:ID_MicroCiclo', EditarMicroCiclo);
router.get('/RutaMicroCiclo', ObtenerMicroCiclos);
router.get('/RutaMicroCiclo/:ID_MicroCiclo', ObtenerMicroCicloPorId);
router.get('/RutaMicroCiclo/PorMesoCiclo/:mesoCicloId', ObtenerMicroCiclosPorMesoCiclo);
router.delete('/RutaMicroCiclo/:ID_MicroCiclo', EliminarMicroCiclo);

module.exports = router;
