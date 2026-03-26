const ResultadoChequeo = require('../shared/models/ResultadoChequeo');

const AgregarResultadoChequeo = async (req, res) => {

    try{
        const { Chequeo_FK, Atributo, Valor, Unidad} = req.body;

        const nuevoResultadoChequeo = await ResultadoChequeo.create({ Chequeo_FK, Atributo, Valor, Unidad });

        res.status(201).json({
            message: 'Resultado de chequeo creado exitosamente',
            timestamp: new Date(),
            resultadoChequeo: nuevoResultadoChequeo
      
        });
    }
    catch(error){
        console.error('Error al crear el resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al crear el resultado de chequeo' });
    }
}

const EditarResultadoChequeo = async (req, res) => {

    try{
        const { id } = req.params;
        const { Chequeo_FK, Atributo, Valor, Unidad } = req.body;
        const ResultadoChequeoExistente = await ResultadoChequeo.findByPk(id);

        if (!ResultadoChequeoExistente) {
            return res.status(404).json({ error: 'Resultado de chequeo no encontrado' });
        }

        await ResultadoChequeoExistente.update({Chequeo_FK, Atributo, Valor, Unidad});

        res.status(200).json({
            message: 'Resultado de chequeo actualizado exitosamente',
            timestamp: new Date(),
            resultadoChequeo: ResultadoChequeoExistente
        });
    }
    catch(error){
        console.error('Error al actualizar el resultado de chequeo:', error);
        res.status(500).json({ error: 'Error al actualizar el resultado de chequeo' });
    }
}

module.exports = {
    AgregarResultadoChequeo,
    EditarResultadoChequeo
}