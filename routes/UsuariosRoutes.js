const Express = require('express');
const {
    AgregarUsuario,
    EditarUsuario,
    ObtenerUsuarios,
    ObtenerUsuarioPorId,
    EliminarUsuario
} = require('../controllers/UsuariosController');

const router = Express.Router();

router.post('/RutaUsuarios/AgregarUsuario', AgregarUsuario);
router.put('/RutaUsuarios/EditarUsuario/:id', EditarUsuario);
router.get('/RutaUsuarios', ObtenerUsuarios);
router.get('/RutaUsuarios/:id', ObtenerUsuarioPorId);
router.delete('/RutaUsuarios/:id', EliminarUsuario);

module.exports = router;
