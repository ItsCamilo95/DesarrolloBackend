const Chequeo = require('../shared/models/Chequeo');

// Crear Chequeo
const AgregarChequeo = async (req, res) => {
    try {
        const { Fecha, SemanaCiclo, Observaciones, MicroCiclo_FK } = req.body;

        const nuevoChequeo = await Chequeo.create({
            Fecha: Fecha || null,
            SemanaCiclo: SemanaCiclo || null,
            Observaciones: Observaciones || null,
            MicroCiclo_FK: MicroCiclo_FK || null
        });

        res.status(201).json({
            message: 'Chequeo creado exitosamente',
            timestamp: new Date(),
            data: nuevoChequeo
        });
    } catch (error) {
        console.error('Error al crear el chequeo:', error);
        res.status(500).json({ error: 'Error al crear el chequeo', details: error.message });
    }
};

// Editar Chequeo
const EditarChequeo = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha, SemanaCiclo, Observaciones, MicroCiclo_FK } = req.body;

        const chequeoExistente = await Chequeo.findByPk(id);
        if (!chequeoExistente) {
            return res.status(404).json({ error: 'Chequeo no encontrado' });
        }

        await chequeoExistente.update({
            Fecha: Fecha || chequeoExistente.Fecha,
            SemanaCiclo: SemanaCiclo || chequeoExistente.SemanaCiclo,
            Observaciones: Observaciones || chequeoExistente.Observaciones,
            MicroCiclo_FK: MicroCiclo_FK || chequeoExistente.MicroCiclo_FK
        });

        res.status(200).json({
            message: 'Chequeo actualizado exitosamente',
            timestamp: new Date(),
            data: chequeoExistente
        });
    } catch (error) {
        console.error('Error al actualizar el chequeo:', error);
        res.status(500).json({ error: 'Error al actualizar el chequeo', details: error.message });
    }
};

// Obtener todos los Chequeos
const ObtenerChequeos = async (req, res) => {
    try {
        const chequeos = await Chequeo.findAll();
        res.status(200).json({
            message: 'Chequeos obtenidos correctamente',
            timestamp: new Date(),
            data: chequeos
        });
    } catch (error) {
        console.error('Error al obtener chequeos:', error);
        res.status(500).json({ error: 'Error al obtener chequeos', details: error.message });
    }
};

// Obtener Chequeo por ID
const ObtenerChequeoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const chequeo = await Chequeo.findByPk(id);

        if (!chequeo) {
            return res.status(404).json({ error: 'Chequeo no encontrado' });
        }

        res.status(200).json({
            message: 'Chequeo obtenido correctamente',
            timestamp: new Date(),
            data: chequeo
        });
    } catch (error) {
        console.error('Error al obtener chequeo:', error);
        res.status(500).json({ error: 'Error al obtener chequeo', details: error.message });
    }
};

// Obtener Chequeos por MicroCiclo
const ObtenerChequeosPorMicroCiclo = async (req, res) => {
    try {
        const { microCicloId } = req.params;
        const chequeos = await Chequeo.findAll({
            where: { MicroCiclo_FK: microCicloId }
        });

        if (!chequeos || chequeos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron chequeos para este micro ciclo' });
        }

        res.status(200).json({
            message: 'Chequeos obtenidos correctamente para el micro ciclo',
            timestamp: new Date(),
            data: chequeos
        });
    } catch (error) {
        console.error('Error al obtener chequeos por micro ciclo:', error);
        res.status(500).json({ error: 'Error al obtener chequeos por micro ciclo', details: error.message });
    }
};

// Eliminar Chequeo
const EliminarChequeo = async (req, res) => {
    try {
        const { id } = req.params;
        const chequeo = await Chequeo.findByPk(id);

        if (!chequeo) {
            return res.status(404).json({ error: 'Chequeo no encontrado' });
        }

        await chequeo.destroy();

        res.status(200).json({
            message: 'Chequeo eliminado correctamente',
            timestamp: new Date(),
            data: chequeo
        });
    } catch (error) {
        console.error('Error al eliminar chequeo:', error);
        res.status(500).json({ error: 'Error al eliminar chequeo', details: error.message });
    }
};

module.exports = {
    AgregarChequeo,
    EditarChequeo,
    ObtenerChequeos,
    ObtenerChequeoPorId,
    ObtenerChequeosPorMicroCiclo,
    EliminarChequeo
};
