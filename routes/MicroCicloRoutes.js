const Express = require('express');
const {CrearMicroCiclo,EditarMicroCiclo} = require('../controllers/MicroCicloController')

const router = Express.Router();


router.post('/RutaMicroCiclo/CrearMicroCiclo', CrearMicroCiclo)
router.put('/RutaMicroCiclo/EditarMicroCiclo/:ID_MicroCiclo', EditarMicroCiclo)



module.exports = router;