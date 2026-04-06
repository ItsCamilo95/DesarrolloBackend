const MicroCiclo = require('../shared/models/MicroCiclo');
const EntrenamientoDiario = require('../shared/models/EntrenamientoDiario');
const Chequeo = require('../shared/models/Chequeo');

const DuplicarMicroCiclo = async (req, res) => {
    try {
        const { microCicloId } = req.body;

        // Buscar microciclo original
        const original = await MicroCiclo.findByPk(microCicloId);
        if (!original) {
            return res.status(404).json({ error: 'MicroCiclo no encontrado' });
        }

        // Crear nuevo microciclo
        const nuevoMicro = await MicroCiclo.create({
            Nombre: `${original.Nombre} Copia`,
            FechaInicio: original.FechaInicio,
            FechaFin: original.FechaFin,
            Descripcion: original.Descripcion,
            TipoCiclo: original.TipoCiclo,
            ATR: original.ATR,
            MacroCiclo_FK: original.MacroCiclo_FK,
            MesoCiclo_FK: original.MesoCiclo_FK
        });

        // Buscar entrenamientos diarios del microciclo original
        const entrenamientosOriginales = await EntrenamientoDiario.findAll({
            where: { MicroCiclo_FK: microCicloId }
        });

        const entrenamientosDuplicados = [];
        for (const ent of entrenamientosOriginales) {
            const nuevoEnt = await EntrenamientoDiario.create({
                MicroCiclo_FK: nuevoMicro.ID_MicroCiclo,
                Fecha: ent.Fecha,
                HoraInicio: ent.HoraInicio,
                Tipo: ent.Tipo,
                Descripcion: ent.Descripcion,
                UbicacionEntrenamiento: ent.UbicacionEntrenamiento
            });
            entrenamientosDuplicados.push(nuevoEnt);
        }

        // Buscar chequeos del microciclo original
        const chequeosOriginales = await Chequeo.findAll({
            where: { MicroCiclo_FK: microCicloId }
        });

        const chequeosDuplicados = [];
        for (const chk of chequeosOriginales) {
            const nuevoChk = await Chequeo.create({
                MicroCiclo_FK: nuevoMicro.ID_MicroCiclo,
                Fecha: chk.Fecha,
                SemanaCiclo: chk.SemanaCiclo,
                Observaciones: chk.Observaciones
            });
            chequeosDuplicados.push(nuevoChk);
        }

        res.status(201).json({
            message: 'MicroCiclo duplicado exitosamente',
            timestamp: new Date(),
            microCiclo: nuevoMicro,
            entrenamientos: entrenamientosDuplicados,
            chequeos: chequeosDuplicados
        });
    } catch (error) {
        console.error('Error al duplicar microciclo:', error);
        res.status(500).json({ error: 'Error al duplicar microciclo', details: error.message });
    }
};

module.exports = { DuplicarMicroCiclo };
