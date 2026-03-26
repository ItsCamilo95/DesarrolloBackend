const Express = require('express');
const {AgregarNota, EditarNota} = require('../controllers/NotasController');

const router = Express.Router();

router.post('/RutaNotas/AgregarNota', AgregarNota)
router.put('/RutaNotas/EditarNota/:id', EditarNota)


module.exports = router;