const Chequeo = require('../shared/models/Chequeo');

const AgregarChequeo = async (req, res) => {

    try{
        const { Fecha, SemanaCiclo, Observaciones, EntrenamientoDiario_FK} = req.body;

        const nuevoChequeo = await Chequeo.create({ Fecha, SemanaCiclo, Observaciones, EntrenamientoDiario_FK });

        res.status(201).json({
            message: 'Chequeo creado exitosamente',
            timestamp: new Date(),
            macroCiclo: nuevoChequeo
        });
    }
    catch(error){
        console.error('Error al crear el chequeo:', error);
        res.status(500).json({ error: 'Error al crear el chequeo' });
    }
}

const EditarChequeo = async (req, res) => {

    try{
        const { id } = req.params;
        const { Fecha, SemanaCiclo, Observaciones, EntrenamientoDiario_FK } = req.body;
        const ChequeoExistente = await Chequeo.findByPk(id);

        if (!ChequeoExistente) {
            return res.status(404).json({ error: 'Chequeo no encontrado' });
        }

        await ChequeoExistente.update({ Fecha, SemanaCiclo, Observaciones, EntrenamientoDiario_FK });

        res.status(200).json({
            message: 'Chequeo actualizado exitosamente',
            timestamp: new Date(),
            Chequeo: ChequeoExistente
        });
    }
    catch(error){
        console.error('Error al actualizar el chequeo:', error);
        res.status(500).json({ error: 'Error al actualizar el chequeo' });
    }
}

module.exports = {
    AgregarChequeo,
    EditarChequeo
}