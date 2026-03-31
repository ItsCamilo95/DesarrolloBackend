const ResultadoChequeo = require('../shared/models/ResultadoChequeo');

// Crear ResultadoChequeo
const AgregarResultadoChequeo = async (req, res) => {
    try {
        const { Chequeo_FK, Atributo, Valor, Unidad } = req.body;

        const nuevoResultadoChequeo = await ResultadoChequeo.create({
            Chequeo_FK: Chequeo_FK || null,
            Atributo: Atributo || null,
            Valor: Valor || null,
            Unidad: Unidad || null
        });

        res.status(201).json({
            message: 'Resultado de chequeo creado exitosamente',
            timestamp: new Date(),
            data: nuevoResultadoChequeo
        });
    } catch (error) {
        console.error('Error al crear el resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al crear el resultado de chequeo', details: error.message });
    }
};

// Editar ResultadoChequeo
const EditarResultadoChequeo = async (req, res) => {
    try {
        const { id } = req.params;
        const { Chequeo_FK, Atributo, Valor, Unidad } = req.body;

        const resultadoExistente = await ResultadoChequeo.findByPk(id);
        if (!resultadoExistente) {
            return res.status(404).json({ error: 'Resultado de chequeo no encontrado' });
        }

        await resultadoExistente.update({
            Chequeo_FK: Chequeo_FK || resultadoExistente.Chequeo_FK,
            Atributo: Atributo || resultadoExistente.Atributo,
            Valor: Valor || resultadoExistente.Valor,
            Unidad: Unidad || resultadoExistente.Unidad
        });

        res.status(200).json({
            message: 'Resultado de chequeo actualizado exitosamente',
            timestamp: new Date(),
            data: resultadoExistente
        });
    } catch (error) {
        console.error('Error al actualizar el resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al actualizar el resultado de chequeo', details: error.message });
    }
};

// Obtener todos los ResultadosChequeo
const ObtenerResultadosChequeo = async (req, res) => {
    try {
        const resultados = await ResultadoChequeo.findAll();
        res.status(200).json({
            message: 'Resultados de chequeo obtenidos correctamente',
            timestamp: new Date(),
            data: resultados
        });
    } catch (error) {
        console.error('Error al obtener resultados de chequeo:', error);
        res.status(500).json({ error: 'Error al obtener resultados de chequeo', details: error.message });
    }
};

// Obtener ResultadoChequeo por ID
const ObtenerResultadoChequeoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await ResultadoChequeo.findByPk(id);

        if (!resultado) {
            return res.status(404).json({ error: 'Resultado de chequeo no encontrado' });
        }

        res.status(200).json({
            message: 'Resultado de chequeo obtenido correctamente',
            timestamp: new Date(),
            data: resultado
        });
    } catch (error) {
        console.error('Error al obtener resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al obtener resultado de chequeo', details: error.message });
    }
};

// Obtener ResultadosChequeo por Chequeo
const ObtenerResultadosPorChequeo = async (req, res) => {
    try {
        const { chequeoId } = req.params;
        const resultados = await ResultadoChequeo.findAll({
            where: { Chequeo_FK: chequeoId }
        });

        if (!resultados || resultados.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados para este chequeo' });
        }

        res.status(200).json({
            message: 'Resultados de chequeo obtenidos correctamente para el chequeo',
            timestamp: new Date(),
            data: resultados
        });
    } catch (error) {
        console.error('Error al obtener resultados por chequeo:', error);
        res.status(500).json({ error: 'Error al obtener resultados por chequeo', details: error.message });
    }
};

// Eliminar ResultadoChequeo
const EliminarResultadoChequeo = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await ResultadoChequeo.findByPk(id);

        if (!resultado) {
            return res.status(404).json({ error: 'Resultado de chequeo no encontrado' });
        }

        await resultado.destroy();

        res.status(200).json({
            message: 'Resultado de chequeo eliminado correctamente',
            timestamp: new Date(),
            data: resultado
        });
    } catch (error) {
        console.error('Error al eliminar resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al eliminar resultado de chequeo', details: error.message });
    }
};

module.exports = {
    AgregarResultadoChequeo,
    EditarResultadoChequeo,
    ObtenerResultadosChequeo,
    ObtenerResultadoChequeoPorId,
    ObtenerResultadosPorChequeo,
    EliminarResultadoChequeo
};
