const Express = require('express');
const {
    CrearMesoCiclo,
    EditarMesoCiclo,
    ObtenerMesoCiclos,
    ObtenerMesoCicloPorId,
    ObtenerMesoCiclosPorMacroCiclo
} = require('../controllers/MesoCicloController');

const router = Express.Router();

router.post('/RutaMesoCiclo/CrearMesoCiclo', CrearMesoCiclo);
router.put('/RutaMesoCiclo/EditarMesoCiclo/:ID_MesoCiclo', EditarMesoCiclo);
router.get('/RutaMesoCiclo', ObtenerMesoCiclos);
router.get('/RutaMesoCiclo/:ID_MesoCiclo', ObtenerMesoCicloPorId);
router.get('/RutaMesoCiclo/PorMacroCiclo/:macroCicloId', ObtenerMesoCiclosPorMacroCiclo);

module.exports = router;
