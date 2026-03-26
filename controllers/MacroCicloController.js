const MacroCiclo = require('../shared/models/MacroCiclo');

// Crear MacroCiclo
const CrearMacroCiclo = async (req, res) => {
    try {
        const {
            Nombre,
            FechaInicio,
            FechaFin,
            Objetivo_Principal,
            Competencia_Meta,
            Descripcion,
            Atleta_FK
        } = req.body;

        if (!Atleta_FK) {
            return res.status(400).json({ error: 'El campo Atleta_FK es requerido' });
        }

        const nuevoMacroCiclo = await MacroCiclo.create({
            Nombre: Nombre || null,
            FechaInicio: FechaInicio || null,
            FechaFin: FechaFin || null,
            Objetivo_Principal: Objetivo_Principal || null,
            Competencia_Meta: Competencia_Meta || null,
            Descripcion: Descripcion || null,
            Atleta_FK
        });

        res.status(201).json({
            message: 'Macro ciclo creado exitosamente',
            timestamp: new Date(),
            data: nuevoMacroCiclo
        });
    } catch (error) {
        console.error('Error al crear el macro ciclo:', error);
        res.status(500).json({ error: 'Error al crear el macro ciclo', details: error.message });
    }
};

// Editar MacroCiclo
const EditarMacroCiclo = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            Nombre,
            FechaInicio,
            FechaFin,
            Objetivo_Principal,
            Competencia_Meta,
            Descripcion,
            Atleta_FK
        } = req.body;

        const macroCicloExistente = await MacroCiclo.findByPk(id);

        if (!macroCicloExistente) {
            return res.status(404).json({ error: 'Macro ciclo no encontrado' });
        }

        await macroCicloExistente.update({
            Nombre: Nombre || macroCicloExistente.Nombre,
            FechaInicio: FechaInicio || macroCicloExistente.FechaInicio,
            FechaFin: FechaFin || macroCicloExistente.FechaFin,
            Objetivo_Principal: Objetivo_Principal || macroCicloExistente.Objetivo_Principal,
            Competencia_Meta: Competencia_Meta || macroCicloExistente.Competencia_Meta,
            Descripcion: Descripcion || macroCicloExistente.Descripcion,
            Atleta_FK: Atleta_FK || macroCicloExistente.Atleta_FK
        });

        res.status(200).json({
            message: 'Macro ciclo actualizado exitosamente',
            timestamp: new Date(),
            data: macroCicloExistente
        });
    } catch (error) {
        console.error('Error al actualizar el macro ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el macro ciclo', details: error.message });
    }
};

// Obtener todos los MacroCiclos
const ObtenerMacroCiclos = async (req, res) => {
    try {
        const macroCiclos = await MacroCiclo.findAll();
        res.status(200).json({
            message: 'Macro ciclos obtenidos correctamente',
            timestamp: new Date(),
            data: macroCiclos
        });
    } catch (error) {
        console.error('Error al obtener macro ciclos:', error);
        res.status(500).json({ error: 'Error al obtener macro ciclos', details: error.message });
    }
};

// Obtener MacroCiclo por ID
const ObtenerMacroCicloPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const macroCiclo = await MacroCiclo.findByPk(id);

        if (!macroCiclo) {
            return res.status(404).json({ error: 'Macro ciclo no encontrado' });
        }

        res.status(200).json({
            message: 'Macro ciclo obtenido correctamente',
            timestamp: new Date(),
            data: macroCiclo
        });
    } catch (error) {
        console.error('Error al obtener macro ciclo:', error);
        res.status(500).json({ error: 'Error al obtener macro ciclo', details: error.message });
    }
};

// Eliminar MacroCiclo
const EliminarMacroCiclo = async (req, res) => {
    try {
        const { id } = req.params;
        const macroCiclo = await MacroCiclo.findByPk(id);

        if (!macroCiclo) {
            return res.status(404).json({ error: 'Macro ciclo no encontrado' });
        }

        await macroCiclo.destroy();

        res.status(200).json({
            message: 'Macro ciclo eliminado correctamente',
            timestamp: new Date(),
            data: macroCiclo
        });
    } catch (error) {
        console.error('Error al eliminar macro ciclo:', error);
        res.status(500).json({ error: 'Error al eliminar macro ciclo', details: error.message });
    }
};

// Obtener MacroCiclos por Atleta
const ObtenerMacroCiclosPorAtleta = async (req, res) => {
    try {
        const { atletaId } = req.params;
        const macroCiclos = await MacroCiclo.findAll({
            where: { Atleta_FK: atletaId }
        });

        if (!macroCiclos || macroCiclos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron macro ciclos para este atleta' });
        }

        res.status(200).json({
            message: 'Macro ciclos obtenidos correctamente para el atleta',
            timestamp: new Date(),
            data: macroCiclos
        });
    } catch (error) {
        console.error('Error al obtener macro ciclos por atleta:', error);
        res.status(500).json({ error: 'Error al obtener macro ciclos por atleta', details: error.message });
    }
};

module.exports = {
    CrearMacroCiclo,
    EditarMacroCiclo,
    ObtenerMacroCiclos,
    ObtenerMacroCicloPorId,
    EliminarMacroCiclo,
    ObtenerMacroCiclosPorAtleta
};
