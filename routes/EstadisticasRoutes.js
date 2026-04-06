const Express = require('express');
const { ObtenerEstadisticas } = require('../controllers/EstadisticasController');

const router = Express.Router();

router.post('/RutaEstadisticas', ObtenerEstadisticas);

module.exports = router;
