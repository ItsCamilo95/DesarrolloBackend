const MesoCiclo = require('../shared/models/MesoCiclo');

const CrearMesoCiclo = async (req, res) => {
    try{
        const { MacroCiclo_FK, FechaInicio, FechaFin } = req.body;

        const nuevoMesoCiclo = await MesoCiclo.create({MacroCiclo_FK, FechaInicio, FechaFin});

        res.status(201).json({
            message: 'El meso ciclo se creo de manera correcta',
            timestamp: new Date(),
            data: nuevoMesoCiclo
        });
    }
    catch(error){
        console.error('Error al crear el meso ciclo:', error);
        res.status(500).json({ error: 'Error al crear el meso ciclo' });
    }
}


const EditarMesoCiclo = async (req, res) => {
    try {
        const { ID_MesoCiclo } = req.params;
        const { MacroCiclo_FK, FechaInicio, FechaFin } = req.body;

        const mesoCicloExistente = await MesoCiclo.findByPk(ID_MesoCiclo);
        if (!mesoCicloExistente) {
            return res.status(404).json({ error: 'Meso ciclo no encontrado' });
        }
        
        await mesoCicloExistente.update({ MacroCiclo_FK, FechaInicio, FechaFin });

        res.status(200).json({
            message: 'El meso ciclo se actualizo de manera correcta',
            timestamp: new Date(),
            data: mesoCicloExistente
        });
    } catch (error) {
        console.error('Error al actualizar el meso ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el meso ciclo' });
    }
}


module.exports = {
    CrearMesoCiclo,
    EditarMesoCiclo
}


