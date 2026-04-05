const MesoCiclo = require('../shared/models/MesoCiclo');

// Crear MesoCiclo
const CrearMesoCiclo = async (req, res) => {
    try {
        const {
            Nombre,
            Tipo,
            Semanas,
            Volumen,
            Intensidad,
            Objetivos,
            Periodo,
            FechaInicio,
            FechaFin,
            MacroCiclo_FK
        } = req.body;

        if (!MacroCiclo_FK) {
            return res.status(400).json({ error: 'El campo MacroCiclo_FK es requerido' });
        }

        const nuevoMesoCiclo = await MesoCiclo.create({
            Nombre: Nombre || null,
            Tipo: Tipo || null,
            Semanas: Semanas || null,
            Volumen: Volumen || null,       // número
            Intensidad: Intensidad || null, // número
            Objetivos: Objetivos || null,
            Periodo: Periodo || null,
            FechaInicio: FechaInicio || null,
            FechaFin: FechaFin || null,
            MacroCiclo_FK
        });

        res.status(201).json({
            message: 'El meso ciclo se creó de manera correcta',
            timestamp: new Date(),
            data: nuevoMesoCiclo
        });
    } catch (error) {
        console.error('Error al crear el meso ciclo:', error);
        res.status(500).json({ error: 'Error al crear el meso ciclo', details: error.message });
    }
};

// Editar MesoCiclo
const EditarMesoCiclo = async (req, res) => {
    try {
        const { ID_MesoCiclo } = req.params;
        const {
            Nombre,
            Tipo,
            Semanas,
            Volumen,
            Intensidad,
            Objetivos,
            Periodo,
            FechaInicio,
            FechaFin,
            MacroCiclo_FK
        } = req.body;

        const mesoCicloExistente = await MesoCiclo.findByPk(ID_MesoCiclo);
        if (!mesoCicloExistente) {
            return res.status(404).json({ error: 'Meso ciclo no encontrado' });
        }

        await mesoCicloExistente.update({
            Nombre: Nombre || mesoCicloExistente.Nombre,
            Tipo: Tipo || mesoCicloExistente.Tipo,
            Semanas: Semanas || mesoCicloExistente.Semanas,
            Volumen: Volumen || mesoCicloExistente.Volumen,       // número
            Intensidad: Intensidad || mesoCicloExistente.Intensidad, // número
            Objetivos: Objetivos || mesoCicloExistente.Objetivos,
            Periodo: Periodo || mesoCicloExistente.Periodo,
            FechaInicio: FechaInicio || mesoCicloExistente.FechaInicio,
            FechaFin: FechaFin || mesoCicloExistente.FechaFin,
            MacroCiclo_FK: MacroCiclo_FK || mesoCicloExistente.MacroCiclo_FK
        });

        res.status(200).json({
            message: 'El meso ciclo se actualizó de manera correcta',
            timestamp: new Date(),
            data: mesoCicloExistente
        });
    } catch (error) {
        console.error('Error al actualizar el meso ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el meso ciclo', details: error.message });
    }
};

// Obtener todos los MesoCiclos
const ObtenerMesoCiclos = async (req, res) => {
    try {
        const mesoCiclos = await MesoCiclo.findAll();
        res.status(200).json({
            message: 'Mesociclos obtenidos correctamente',
            timestamp: new Date(),
            data: mesoCiclos
        });
    } catch (error) {
        console.error('Error al obtener mesociclos:', error);
        res.status(500).json({ error: 'Error al obtener mesociclos', details: error.message });
    }
};

// Obtener MesoCiclo por ID
const ObtenerMesoCicloPorId = async (req, res) => {
    try {
        const { ID_MesoCiclo } = req.params;
        const mesoCiclo = await MesoCiclo.findByPk(ID_MesoCiclo);

        if (!mesoCiclo) {
            return res.status(404).json({ error: 'Meso ciclo no encontrado' });
        }

        res.status(200).json({
            message: 'Meso ciclo obtenido correctamente',
            timestamp: new Date(),
            data: mesoCiclo
        });
    } catch (error) {
        console.error('Error al obtener meso ciclo:', error);
        res.status(500).json({ error: 'Error al obtener meso ciclo', details: error.message });
    }
};

// Obtener mesociclos por MacroCiclo
const ObtenerMesoCiclosPorMacroCiclo = async (req, res) => {
    try {
        const { macroCicloId } = req.params;
        const mesoCiclos = await MesoCiclo.findAll({
            where: { MacroCiclo_FK: macroCicloId }
        });

        if (!mesoCiclos || mesoCiclos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron meso ciclos para este macro ciclo' });
        }

        res.status(200).json({
            message: 'Mesociclos obtenidos correctamente para el macro ciclo',
            timestamp: new Date(),
            data: mesoCiclos
        });
    } catch (error) {
        console.error('Error al obtener meso ciclos por macro ciclo:', error);
        res.status(500).json({ error: 'Error al obtener meso ciclos por macro ciclo', details: error.message });
    }
};

// Eliminar MesoCiclo
const EliminarMesoCiclo = async (req, res) => {
    try {
        const { ID_MesoCiclo } = req.params;
        const mesoCiclo = await MesoCiclo.findByPk(ID_MesoCiclo);

        if (!mesoCiclo) {
            return res.status(404).json({ error: 'Meso ciclo no encontrado' });
        }

        await mesoCiclo.destroy();

        res.status(200).json({
            message: 'Meso ciclo eliminado correctamente',
            timestamp: new Date(),
            data: mesoCiclo
        });
    } catch (error) {
        console.error('Error al eliminar meso ciclo:', error);
        res.status(500).json({ error: 'Error al eliminar meso ciclo', details: error.message });
    }
};

module.exports = {
    CrearMesoCiclo,
    EditarMesoCiclo,
    ObtenerMesoCiclos,
    ObtenerMesoCicloPorId,
    ObtenerMesoCiclosPorMacroCiclo,
    EliminarMesoCiclo
};
