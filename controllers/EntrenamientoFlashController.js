const EntrenamientoFlash = require('../shared/models/EntrenamientoFlash');

// Crear EntrenamientoFlash
const AgregarEntrenamientoFlash = async (req, res) => {
    try {
        const { Nombre, Descripcion, Duracion, Categoria } = req.body;

        const nuevoEntrenamientoFlash = await EntrenamientoFlash.create({
            Nombre: Nombre || null,
            Descripcion: Descripcion || null,
            Duracion: Duracion || null,
            Categoria: Categoria || null
        });

        res.status(201).json({
            message: 'Entrenamiento flash creado exitosamente',
            timestamp: new Date(),
            data: nuevoEntrenamientoFlash
        });
    } catch (error) {
        console.error('Error al crear el entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al crear el entrenamiento flash', details: error.message });
    }
};

// Editar EntrenamientoFlash
const EditarEntrenamientoFlash = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Descripcion, Duracion, Categoria } = req.body;

        const entrenamientoFlashExistente = await EntrenamientoFlash.findByPk(id);
        if (!entrenamientoFlashExistente) {
            return res.status(404).json({ error: 'Entrenamiento flash no encontrado' });
        }

        await entrenamientoFlashExistente.update({
            Nombre: Nombre || entrenamientoFlashExistente.Nombre,
            Descripcion: Descripcion || entrenamientoFlashExistente.Descripcion,
            Duracion: Duracion || entrenamientoFlashExistente.Duracion,
            Categoria: Categoria || entrenamientoFlashExistente.Categoria
        });

        res.status(200).json({
            message: 'Entrenamiento flash actualizado exitosamente',
            timestamp: new Date(),
            data: entrenamientoFlashExistente
        });
    } catch (error) {
        console.error('Error al actualizar el entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al actualizar el entrenamiento flash', details: error.message });
    }
};

// Obtener todos los EntrenamientosFlash
const ObtenerEntrenamientosFlash = async (req, res) => {
    try {
        const entrenamientos = await EntrenamientoFlash.findAll();
        res.status(200).json({
            message: 'Entrenamientos flash obtenidos correctamente',
            timestamp: new Date(),
            data: entrenamientos
        });
    } catch (error) {
        console.error('Error al obtener entrenamientos flash:', error);
        res.status(500).json({ error: 'Error al obtener entrenamientos flash', details: error.message });
    }
};

// Obtener EntrenamientoFlash por ID
const ObtenerEntrenamientoFlashPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await EntrenamientoFlash.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'Entrenamiento flash no encontrado' });
        }

        res.status(200).json({
            message: 'Entrenamiento flash obtenido correctamente',
            timestamp: new Date(),
            data: entrenamiento
        });
    } catch (error) {
        console.error('Error al obtener entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al obtener entrenamiento flash', details: error.message });
    }
};

// Eliminar EntrenamientoFlash
const EliminarEntrenamientoFlash = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await EntrenamientoFlash.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'Entrenamiento flash no encontrado' });
        }

        await entrenamiento.destroy();

        res.status(200).json({
            message: 'Entrenamiento flash eliminado correctamente',
            timestamp: new Date(),
            data: entrenamiento
        });
    } catch (error) {
        console.error('Error al eliminar entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al eliminar entrenamiento flash', details: error.message });
    }
};

module.exports = {
    AgregarEntrenamientoFlash,
    EditarEntrenamientoFlash,
    ObtenerEntrenamientosFlash,
    ObtenerEntrenamientoFlashPorId,
    EliminarEntrenamientoFlash
};
