const Usuarios = require('../shared/models/Usuarios');

// Crear Usuario
const AgregarUsuario = async (req, res) => {
    try {
        const { Correo, Contraseña, Telefono } = req.body;

        const nuevoUsuario = await Usuarios.create({
            Correo,
            Contraseña,
            Telefono: Telefono || null
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            timestamp: new Date(),
            data: nuevoUsuario
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
};

// Editar Usuario
const EditarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { Correo, Contraseña, Telefono } = req.body;

        const usuarioExistente = await Usuarios.findByPk(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuarioExistente.update({
            Correo: Correo || usuarioExistente.Correo,
            Contraseña: Contraseña || usuarioExistente.Contraseña,
            Telefono: Telefono || usuarioExistente.Telefono
        });

        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            timestamp: new Date(),
            data: usuarioExistente
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
};

// Obtener todos los Usuarios
const ObtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            timestamp: new Date(),
            data: usuarios
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
};

// Obtener Usuario por ID
const ObtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({
            message: 'Usuario obtenido correctamente',
            timestamp: new Date(),
            data: usuario
        });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario', details: error.message });
    }
};

// Eliminar Usuario
const EliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();

        res.status(200).json({
            message: 'Usuario eliminado correctamente',
            timestamp: new Date(),
            data: usuario
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
};

module.exports = {
    AgregarUsuario,
    EditarUsuario,
    ObtenerUsuarios,
    ObtenerUsuarioPorId,
    EliminarUsuario
};
