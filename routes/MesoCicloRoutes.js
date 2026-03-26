const Express = require('express');
const {CrearMesoCiclo,EditarMesoCiclo} = require('../controllers/MesoCicloController')

const router = Express.Router();


router.post('/RutaMesoCiclo/CrearMesoCiclo', CrearMesoCiclo)
router.put('/RutaMesoCiclo/EditarMesoCiclo/:ID_MesoCiclo', EditarMesoCiclo)



module.exports = router;