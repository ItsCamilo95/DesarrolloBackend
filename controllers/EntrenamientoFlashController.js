const EntrenamientoFlash = require('../shared/models/EntrenamientoFlash');

const AgregarEntrenamientoFlash = async (req, res) => {

    try{
        const { Nombre, Descripcion, Duracion, Categoria } = req.body;

        const nuevoEntrenamientoFlash = await EntrenamientoFlash.create({ Nombre, Descripcion, Duracion, Categoria });

        res.status(201).json({
            message: 'Entrenamiento flash creado exitosamente',
            timestamp: new Date(),
            macroCiclo: nuevoEntrenamientoFlash
        });
    }
    catch(error){
        console.error('Error al crear el entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al crear el entrenamiento flash' });
    }
}

const EditarEntrenamientoFlash = async (req, res) => {

    try{
        const { id } = req.params;
        const { Nombre, Descripcion, Duracion, Categoria } = req.body;
        const EntrenamientoFlashExistente = await EntrenamientoFlash.findByPk(id);

        if (!EntrenamientoFlashExistente) {
            return res.status(404).json({ error: 'Entrenamiento flash no encontrado' });
        }

        await EntrenamientoFlashExistente.update({ Nombre, Descripcion, Duracion, Categoria });

        res.status(200).json({
            message: 'Entrenamiento flash actualizado exitosamente',
            timestamp: new Date(),
            entrenamientoFlash: EntrenamientoFlashExistente
        });
    }
    catch(error){
        console.error('Error al actualizar el entrenamiento flash:', error);
        res.status(500).json({ error: 'Error al actualizar el entrenamiento flash' });
    }
}

module.exports = {
    AgregarEntrenamientoFlash,
    EditarEntrenamientoFlash
}