const Express = require('express');
const {AgregarAtleta, EditarAtletas, ObtenerAtletas, ObtenerAtletaPorId, EliminarAtleta} = require('../controllers/AtletasControllers')

const router = Express.Router();

router.get('/RutaAtletas', ObtenerAtletas)
router.get('/RutaAtletas/:id', ObtenerAtletaPorId)
router.post('/RutaAtletas/RegistrarAtleta', AgregarAtleta)
router.put('/RutaAtletas/EditarAtleta/:id', EditarAtletas)
router.delete('/RutaAtletas/:id', EliminarAtleta)

module.exports = router;