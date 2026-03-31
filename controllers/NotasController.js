const Notas = require('../shared/models/Notas');

// Crear Nota
const AgregarNota = async (req, res) => {
    try {
        const { Nombre, Descripcion, EntrenamientoDiario_FK } = req.body;

        const nuevaNota = await Notas.create({
            Nombre: Nombre || null,
            Descripcion: Descripcion || null,
            EntrenamientoDiario_FK: EntrenamientoDiario_FK || null
        });

        res.status(201).json({
            message: 'Nota creada exitosamente',
            timestamp: new Date(),
            data: nuevaNota
        });
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ error: 'Error al crear la nota', details: error.message });
    }
};

// Editar Nota
const EditarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Descripcion, EntrenamientoDiario_FK } = req.body;

        const notaExistente = await Notas.findByPk(id);
        if (!notaExistente) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        await notaExistente.update({
            Nombre: Nombre || notaExistente.Nombre,
            Descripcion: Descripcion || notaExistente.Descripcion,
            EntrenamientoDiario_FK: EntrenamientoDiario_FK || notaExistente.EntrenamientoDiario_FK
        });

        res.status(200).json({
            message: 'Nota actualizada exitosamente',
            timestamp: new Date(),
            data: notaExistente
        });
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).json({ error: 'Error al actualizar la nota', details: error.message });
    }
};

// Obtener todas las Notas
const ObtenerNotas = async (req, res) => {
    try {
        const notas = await Notas.findAll();
        res.status(200).json({
            message: 'Notas obtenidas correctamente',
            timestamp: new Date(),
            data: notas
        });
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ error: 'Error al obtener notas', details: error.message });
    }
};

// Obtener Nota por ID
const ObtenerNotaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const nota = await Notas.findByPk(id);

        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        res.status(200).json({
            message: 'Nota obtenida correctamente',
            timestamp: new Date(),
            data: nota
        });
    } catch (error) {
        console.error('Error al obtener nota:', error);
        res.status(500).json({ error: 'Error al obtener nota', details: error.message });
    }
};

// Obtener Notas por EntrenamientoDiario
const ObtenerNotasPorEntrenamientoDiario = async (req, res) => {
    try {
        const { entrenamientoDiarioId } = req.params;
        const notas = await Notas.findAll({
            where: { EntrenamientoDiario_FK: entrenamientoDiarioId }
        });

        if (!notas || notas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron notas para este entrenamiento diario' });
        }

        res.status(200).json({
            message: 'Notas obtenidas correctamente para el entrenamiento diario',
            timestamp: new Date(),
            data: notas
        });
    } catch (error) {
        console.error('Error al obtener notas por entrenamiento diario:', error);
        res.status(500).json({ error: 'Error al obtener notas por entrenamiento diario', details: error.message });
    }
};

// Eliminar Nota
const EliminarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const nota = await Notas.findByPk(id);

        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        await nota.destroy();

        res.status(200).json({
            message: 'Nota eliminada correctamente',
            timestamp: new Date(),
            data: nota
        });
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        res.status(500).json({ error: 'Error al eliminar nota', details: error.message });
    }
};

module.exports = {
    AgregarNota,
    EditarNota,
    ObtenerNotas,
    ObtenerNotaPorId,
    ObtenerNotasPorEntrenamientoDiario,
    EliminarNota
};
