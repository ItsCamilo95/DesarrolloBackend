const Express = require('express');
const {
    CrearMacroCiclo,
    EditarMacroCiclo,
    ObtenerMacroCiclos,
    ObtenerMacroCicloPorId,
    EliminarMacroCiclo,
    ObtenerMacroCiclosPorAtleta
} = require('../controllers/MacroCicloController');

const router = Express.Router();

router.get('/RutaMacroCiclo', ObtenerMacroCiclos);
router.get('/RutaMacroCiclo/:id', ObtenerMacroCicloPorId);
router.post('/RutaMacroCiclo/CrearMacroCiclo', CrearMacroCiclo);
router.put('/RutaMacroCiclo/EditarMacroCiclo/:id', EditarMacroCiclo);
router.delete('/RutaMacroCiclo/:id', EliminarMacroCiclo);

// Nueva ruta: obtener macro ciclos por atleta
router.get('/RutaMacroCiclo/PorAtleta/:atletaId', ObtenerMacroCiclosPorAtleta);

module.exports = router;
