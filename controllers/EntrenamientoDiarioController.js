const EntrenamientoDiario = require('../shared/models/EntrenamientoDiario');

// Crear EntrenamientoDiario
const AgregarEntrenamientoDiario = async (req, res) => {
    try {
        const {
            MicroCiclo_FK,
            Fecha,
            HoraInicio,
            HoraFin,
            Tipo,
            Descripcion,
            Chequeo,
            Chequeo_FK
        } = req.body;

        const nuevoEntrenamientoDiario = await EntrenamientoDiario.create({
            MicroCiclo_FK: MicroCiclo_FK || null,
            Fecha: Fecha || null,
            HoraInicio: HoraInicio || null,
            HoraFin: HoraFin || null,
            Tipo: Tipo || null,
            Descripcion: Descripcion || null,
            Chequeo: Chequeo || null,
            Chequeo_FK: Chequeo_FK || null
        });

        res.status(201).json({
            message: 'Entrenamiento Diario creado exitosamente',
            timestamp: new Date(),
            data: nuevoEntrenamientoDiario
        });
    } catch (error) {
        console.error('Error al crear el entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al crear el entrenamiento Diario', details: error.message });
    }
};

// Editar EntrenamientoDiario
const EditarEntrenamientoDiario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            MicroCiclo_FK,
            Fecha,
            HoraInicio,
            HoraFin,
            Tipo,
            Descripcion,
            Chequeo,
            Chequeo_FK
        } = req.body;

        const entrenamientoExistente = await EntrenamientoDiario.findByPk(id);
        if (!entrenamientoExistente) {
            return res.status(404).json({ error: 'Entrenamiento Diario no encontrado' });
        }

        await entrenamientoExistente.update({
            MicroCiclo_FK: MicroCiclo_FK || entrenamientoExistente.MicroCiclo_FK,
            Fecha: Fecha || entrenamientoExistente.Fecha,
            HoraInicio: HoraInicio || entrenamientoExistente.HoraInicio,
            HoraFin: HoraFin || entrenamientoExistente.HoraFin,
            Tipo: Tipo || entrenamientoExistente.Tipo,
            Descripcion: Descripcion || entrenamientoExistente.Descripcion,
            Chequeo: Chequeo !== undefined ? Chequeo : entrenamientoExistente.Chequeo,
            Chequeo_FK: Chequeo_FK || entrenamientoExistente.Chequeo_FK
        });

        res.status(200).json({
            message: 'Entrenamiento Diario actualizado exitosamente',
            timestamp: new Date(),
            data: entrenamientoExistente
        });
    } catch (error) {
        console.error('Error al actualizar el entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al actualizar el entrenamiento Diario', details: error.message });
    }
};

// Obtener todos los EntrenamientosDiarios
const ObtenerEntrenamientosDiarios = async (req, res) => {
    try {
        const entrenamientos = await EntrenamientoDiario.findAll();
        res.status(200).json({
            message: 'Entrenamientos diarios obtenidos correctamente',
            timestamp: new Date(),
            data: entrenamientos
        });
    } catch (error) {
        console.error('Error al obtener entrenamientos diarios:', error);
        res.status(500).json({ error: 'Error al obtener entrenamientos diarios', details: error.message });
    }
};

// Obtener EntrenamientoDiario por ID
const ObtenerEntrenamientoDiarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await EntrenamientoDiario.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'Entrenamiento Diario no encontrado' });
        }

        res.status(200).json({
            message: 'Entrenamiento Diario obtenido correctamente',
            timestamp: new Date(),
            data: entrenamiento
        });
    } catch (error) {
        console.error('Error al obtener entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al obtener entrenamiento Diario', details: error.message });
    }
};

// Obtener EntrenamientosDiarios por MicroCiclo
const ObtenerEntrenamientosDiariosPorMicroCiclo = async (req, res) => {
    try {
        const { microCicloId } = req.params;
        const entrenamientos = await EntrenamientoDiario.findAll({
            where: { MicroCiclo_FK: microCicloId }
        });

        if (!entrenamientos || entrenamientos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron entrenamientos diarios para este micro ciclo' });
        }

        res.status(200).json({
            message: 'Entrenamientos diarios obtenidos correctamente para el micro ciclo',
            timestamp: new Date(),
            data: entrenamientos
        });
    } catch (error) {
        console.error('Error al obtener entrenamientos diarios por micro ciclo:', error);
        res.status(500).json({ error: 'Error al obtener entrenamientos diarios por micro ciclo', details: error.message });
    }
};

// Eliminar EntrenamientoDiario
const EliminarEntrenamientoDiario = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenamiento = await EntrenamientoDiario.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'Entrenamiento Diario no encontrado' });
        }

        await entrenamiento.destroy();

        res.status(200).json({
            message: 'Entrenamiento Diario eliminado correctamente',
            timestamp: new Date(),
            data: entrenamiento
        });
    } catch (error) {
        console.error('Error al eliminar entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al eliminar entrenamiento Diario', details: error.message });
    }
};

module.exports = {
    AgregarEntrenamientoDiario,
    EditarEntrenamientoDiario,
    ObtenerEntrenamientosDiarios,
    ObtenerEntrenamientoDiarioPorId,
    ObtenerEntrenamientosDiariosPorMicroCiclo,
    EliminarEntrenamientoDiario
};
