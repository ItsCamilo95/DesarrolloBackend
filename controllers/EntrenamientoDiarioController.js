const EntrenamientoDiario = require('../shared/models/EntrenamientoDiario');

const AgregarEntrenamientoDiario = async (req, res) => {

    try{
        const { EntrenamientoFlash, EntrenamientoFlash_FK, MicroCiclo_FK, Fecha, HoraInicio, HoraFin, Tipo, Descripcion, Chequeo, Chequeo_FK } = req.body;

        const nuevoEntrenamientoDiario = await EntrenamientoDiario.create({ EntrenamientoFlash, EntrenamientoFlash_FK, MicroCiclo_FK, Fecha, HoraInicio, HoraFin, Tipo, Descripcion, Chequeo, Chequeo_FK });

        res.status(201).json({
            message: 'Entrenamiento Diario creado exitosamente',
            timestamp: new Date(),
            macroCiclo: nuevoEntrenamientoDiario
        });
    }
    catch(error){
        console.error('Error al crear el entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al crear el entrenamiento Diario' });
    }
}

const EditarEntrenamientoDiario = async (req, res) => {

    try{
        const { id } = req.params;
        const { EntrenamientoFlash, EntrenamientoFlash_FK, MicroCiclo_FK, Fecha, HoraInicio, HoraFin, Tipo, Descripcion, Chequeo, Chequeo_FK } = req.body;
        const EntrenamientoDiarioExistente = await EntrenamientoDiario.findByPk(id);

        if (!EntrenamientoDiarioExistente) {
            return res.status(404).json({ error: 'Entrenamiento Diario no encontrado' });
        }

        await EntrenamientoDiarioExistente.update({ EntrenamientoFlash, EntrenamientoFlash_FK, MicroCiclo_FK, Fecha, HoraInicio, HoraFin, Tipo, Descripcion, Chequeo, Chequeo_FK });

        res.status(200).json({
            message: 'Entrenamiento Diario actualizado exitosamente',
            timestamp: new Date(),
            EntrenamientoDiario: EntrenamientoDiarioExistente
        });
    }
    catch(error){
        console.error('Error al actualizar el entrenamiento Diario:', error);
        res.status(500).json({ error: 'Error al actualizar el entrenamiento Diario' });
    }
}

module.exports = {
    AgregarEntrenamientoDiario,
    EditarEntrenamientoDiario
}