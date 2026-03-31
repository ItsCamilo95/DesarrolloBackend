const Express = require('express');
const {
    AgregarNota,
    EditarNota,
    ObtenerNotas,
    ObtenerNotaPorId,
    ObtenerNotasPorEntrenamientoDiario,
    EliminarNota
} = require('../controllers/NotasController');

const router = Express.Router();

router.post('/RutaNotas/AgregarNota', AgregarNota);
router.put('/RutaNotas/EditarNota/:id', EditarNota);
router.get('/RutaNotas', ObtenerNotas);
router.get('/RutaNotas/:id', ObtenerNotaPorId);
router.get('/RutaNotas/PorEntrenamientoDiario/:entrenamientoDiarioId', ObtenerNotasPorEntrenamientoDiario);
router.delete('/RutaNotas/:id', EliminarNota);

module.exports = router;
