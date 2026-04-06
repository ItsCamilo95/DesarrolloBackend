const Express = require('express');
const {
    CrearMesoCiclo,
    EditarMesoCiclo,
    ObtenerMesoCiclos,
    ObtenerMesoCicloPorId,
    ObtenerMesoCiclosPorMacroCiclo,
    EliminarMesoCiclo
} = require('../controllers/MesoCicloController');

const { CrearMesoCicloAutomatico } = require('../controllers/MesoCicloAutomaticoController');

const router = Express.Router();

router.post('/RutaMesoCiclo/CrearMesoCiclo', CrearMesoCiclo);
router.put('/RutaMesoCiclo/EditarMesoCiclo/:ID_MesoCiclo', EditarMesoCiclo);
router.get('/RutaMesoCiclo', ObtenerMesoCiclos);
router.get('/RutaMesoCiclo/:ID_MesoCiclo', ObtenerMesoCicloPorId);
router.get('/RutaMesoCiclo/PorMacroCiclo/:macroCicloId', ObtenerMesoCiclosPorMacroCiclo);
router.delete('/RutaMesoCiclo/:ID_MesoCiclo', EliminarMesoCiclo);

// Nueva ruta automática
router.post('/RutaMesoCiclo/Automatico', CrearMesoCicloAutomatico);

module.exports = router;
