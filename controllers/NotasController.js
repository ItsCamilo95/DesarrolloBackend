const Notas = require('../shared/models/Notas');

const AgregarNota = async (req, res) => {

    try{
        const { Nombre, Descripcion, EntrenamientoDiario_FK} = req.body;

        const nuevaNota = await Notas.create({ Nombre, Descripcion, EntrenamientoDiario_FK });

        res.status(201).json({
            message: 'Nota creada exitosamente',
            timestamp: new Date(),
            nota: nuevaNota
        });
    }
    catch(error){
        console.error('Error al crear la nota:', error);
        res.status(500).json({ error: 'Error al crear la nota' });
    }
}

const EditarNota = async (req, res) => {

    try{
        const { id } = req.params;
        const { Nombre, Descripcion, EntrenamientoDiario_FK } = req.body;
        const NotaExistente = await Notas.findByPk(id);

        if (!NotaExistente) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        await NotaExistente.update({ Nombre, Descripcion, EntrenamientoDiario_FK });

        res.status(200).json({
            message: 'Nota actualizada exitosamente',
            timestamp: new Date(),
            nota: NotaExistente
        });
    }
    catch(error){
        console.error('Error al actualizar la nota:', error);
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
}

module.exports = {
    AgregarNota,
    EditarNota
}