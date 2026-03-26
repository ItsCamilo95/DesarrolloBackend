const MicroCiclo = require('../shared/models/MicroCiclo')

const CrearMicroCiclo = async (req, res) => {
    try{
        const { MacroCiclo_FK, MesoCiclo_FK, FechaInicio, FechaFin, TipoCiclo, Descripcion} = req.body;

        const nuevoMicroCiclo = await MicroCiclo.create({MacroCiclo_FK, MesoCiclo_FK, FechaInicio, FechaFin, TipoCiclo, Descripcion});

        res.status(201).json({
            message: 'El micro ciclo se creo de manera correcta',
            timestamp: new Date(),
            data: nuevoMicroCiclo
        });
    }
    catch(error){
        console.error('Error al crear el micro ciclo:', error);
        res.status(500).json({ error: 'Error al crear el micro ciclo' });
    }
}


const EditarMicroCiclo = async (req, res) => {
    try {
        const { ID_MicroCiclo } = req.params;
        const { MacroCiclo_FK, MesoCiclo_FK, FechaInicio, FechaFin, TipoCiclo, Descripcion} = req.body;

        const microCicloExistente = await MicroCiclo.findByPk(ID_MicroCiclo);
        if (!microCicloExistente) {
            return res.status(404).json({ error: 'Micro ciclo no encontrado' });
        }
        
        await microCicloExistente.update({MacroCiclo_FK, MesoCiclo_FK, FechaInicio, FechaFin, TipoCiclo, Descripcion});

        res.status(200).json({
            message: 'El micro ciclo se actualizo de manera correcta',
            timestamp: new Date(),
            data: microCicloExistente
        });
    } catch (error) {
        console.error('Error al actualizar el micro ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el micro ciclo' });
    }
}

module.exports = {
    CrearMicroCiclo,
    EditarMicroCiclo
}
