const MicroCiclo = require('../shared/models/MicroCiclo');

// Crear MicroCiclo
const CrearMicroCiclo = async (req, res) => {
    try {
        const {
            Nombre,
            Descripcion,
            TipoCiclo,
            FechaInicio,
            FechaFin,
            MacroCiclo_FK,
            MesoCiclo_FK
        } = req.body;

        if (!MesoCiclo_FK) {
            return res.status(400).json({ error: 'El campo MesoCiclo_FK es requerido' });
        }

        const nuevoMicroCiclo = await MicroCiclo.create({
            Nombre: Nombre || null,
            Descripcion: Descripcion || null,
            TipoCiclo: TipoCiclo || null,
            FechaInicio: FechaInicio || null,
            FechaFin: FechaFin || null,
            MacroCiclo_FK: MacroCiclo_FK || null,
            MesoCiclo_FK
        });

        res.status(201).json({
            message: 'El micro ciclo se creó de manera correcta',
            timestamp: new Date(),
            data: nuevoMicroCiclo
        });
    } catch (error) {
        console.error('Error al crear el micro ciclo:', error);
        res.status(500).json({ error: 'Error al crear el micro ciclo', details: error.message });
    }
};

// Editar MicroCiclo
const EditarMicroCiclo = async (req, res) => {
    try {
        const { ID_MicroCiclo } = req.params;
        const {
            Nombre,
            Descripcion,
            TipoCiclo,
            FechaInicio,
            FechaFin,
            MacroCiclo_FK,
            MesoCiclo_FK
        } = req.body;

        const microCicloExistente = await MicroCiclo.findByPk(ID_MicroCiclo);
        if (!microCicloExistente) {
            return res.status(404).json({ error: 'Micro ciclo no encontrado' });
        }

        await microCicloExistente.update({
            Nombre: Nombre || microCicloExistente.Nombre,
            Descripcion: Descripcion || microCicloExistente.Descripcion,
            TipoCiclo: TipoCiclo || microCicloExistente.TipoCiclo,
            FechaInicio: FechaInicio || microCicloExistente.FechaInicio,
            FechaFin: FechaFin || microCicloExistente.FechaFin,
            MacroCiclo_FK: MacroCiclo_FK || microCicloExistente.MacroCiclo_FK,
            MesoCiclo_FK: MesoCiclo_FK || microCicloExistente.MesoCiclo_FK
        });

        res.status(200).json({
            message: 'El micro ciclo se actualizó de manera correcta',
            timestamp: new Date(),
            data: microCicloExistente
        });
    } catch (error) {
        console.error('Error al actualizar el micro ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el micro ciclo', details: error.message });
    }
};

// Obtener todos los MicroCiclos
const ObtenerMicroCiclos = async (req, res) => {
    try {
        const microCiclos = await MicroCiclo.findAll();
        res.status(200).json({
            message: 'Micro ciclos obtenidos correctamente',
            timestamp: new Date(),
            data: microCiclos
        });
    } catch (error) {
        console.error('Error al obtener micro ciclos:', error);
        res.status(500).json({ error: 'Error al obtener micro ciclos', details: error.message });
    }
};

// Obtener MicroCiclo por ID
const ObtenerMicroCicloPorId = async (req, res) => {
    try {
        const { ID_MicroCiclo } = req.params;
        const microCiclo = await MicroCiclo.findByPk(ID_MicroCiclo);

        if (!microCiclo) {
            return res.status(404).json({ error: 'Micro ciclo no encontrado' });
        }

        res.status(200).json({
            message: 'Micro ciclo obtenido correctamente',
            timestamp: new Date(),
            data: microCiclo
        });
    } catch (error) {
        console.error('Error al obtener micro ciclo:', error);
        res.status(500).json({ error: 'Error al obtener micro ciclo', details: error.message });
    }
};

// Obtener MicroCiclos por MesoCiclo
const ObtenerMicroCiclosPorMesoCiclo = async (req, res) => {
    try {
        const { mesoCicloId } = req.params;
        const microCiclos = await MicroCiclo.findAll({
            where: { MesoCiclo_FK: mesoCicloId }
        });

        if (!microCiclos || microCiclos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron micro ciclos para este meso ciclo' });
        }

        res.status(200).json({
            message: 'Micro ciclos obtenidos correctamente para el meso ciclo',
            timestamp: new Date(),
            data: microCiclos
        });
    } catch (error) {
        console.error('Error al obtener micro ciclos por meso ciclo:', error);
        res.status(500).json({ error: 'Error al obtener micro ciclos por meso ciclo', details: error.message });
    }
};

// Eliminar MicroCiclo
const EliminarMicroCiclo = async (req, res) => {
    try {
        const { ID_MicroCiclo } = req.params;
        const microCiclo = await MicroCiclo.findByPk(ID_MicroCiclo);

        if (!microCiclo) {
            return res.status(404).json({ error: 'Micro ciclo no encontrado' });
        }

        await microCiclo.destroy();

        res.status(200).json({
            message: 'Micro ciclo eliminado correctamente',
            timestamp: new Date(),
            data: microCiclo
        });
    } catch (error) {
        console.error('Error al eliminar micro ciclo:', error);
        res.status(500).json({ error: 'Error al eliminar micro ciclo', details: error.message });
    }
};

module.exports = {
    CrearMicroCiclo,
    EditarMicroCiclo,
    ObtenerMicroCiclos,
    ObtenerMicroCicloPorId,
    ObtenerMicroCiclosPorMesoCiclo,
    EliminarMicroCiclo
};
