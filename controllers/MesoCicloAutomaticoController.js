const { Op } = require('sequelize');
const MesoCiclo = require('../shared/models/MesoCiclo');
const MicroCiclo = require('../shared/models/MicroCiclo');
const EntrenamientoDiario = require('../shared/models/EntrenamientoDiario');

// Función para obtener primer y último día de un mes
function getMonthRange(year, month) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0); // último día del mes
    return { start, end };
}

const CrearMesoCicloAutomatico = async (req, res) => {
    try {
        const { macroCicloId } = req.body;

        // Buscar mesociclos existentes para ese MacroCiclo
        const mesociclosExistentes = await MesoCiclo.findAll({
            where: { MacroCiclo_FK: macroCicloId },
            order: [['FechaFin', 'DESC']]
        });

        let year, month;
        if (mesociclosExistentes.length === 0) {
            // Primer mesociclo → mes actual
            const now = new Date();
            year = now.getFullYear();
            month = now.getMonth(); // 0 = enero
        } else {
            // Tomar el siguiente mes después del último mesociclo
            const ultimo = mesociclosExistentes[0].FechaFin;
            const fechaUltimo = new Date(ultimo);
            year = fechaUltimo.getFullYear();
            month = fechaUltimo.getMonth() + 1; // siguiente mes
        }

        const { start, end } = getMonthRange(year, month);

        // Crear MesoCiclo
        const nuevoMeso = await MesoCiclo.create({
            Nombre: `MesoCiclo ${month + 1}-${year}`,
            Tipo: 'Automático',
            Semanas: 4,
            FechaInicio: start,
            FechaFin: end,
            MacroCiclo_FK: macroCicloId
        });

        // Crear 4 MicroCiclos (una semana cada uno)
        const microciclos = [];
        let currentStart = new Date(start);
        for (let i = 0; i < 4; i++) {
            const currentEnd = new Date(currentStart);
            currentEnd.setDate(currentEnd.getDate() + 6); // 7 días

            const micro = await MicroCiclo.create({
                Nombre: `MicroCiclo ${i + 1}`,
                FechaInicio: currentStart,
                FechaFin: currentEnd,
                MacroCiclo_FK: macroCicloId,
                MesoCiclo_FK: nuevoMeso.ID_MesoCiclo
            });

            // Crear 7 entrenamientos diarios vacíos
            for (let d = 0; d < 7; d++) {
                const fechaEntrenamiento = new Date(currentStart);
                fechaEntrenamiento.setDate(currentStart.getDate() + d);

                await EntrenamientoDiario.create({
                    MicroCiclo_FK: micro.ID_MicroCiclo,
                    Fecha: fechaEntrenamiento,
                    HoraInicio: "15:30:00",
                    Tipo: null,
                    Descripcion: null,
                    UbicacionEntrenamiento: null
                });
            }

            microciclos.push(micro);
            currentStart.setDate(currentStart.getDate() + 7); // avanzar a la siguiente semana
        }

        res.status(201).json({
            message: 'MesoCiclo automático creado exitosamente',
            timestamp: new Date(),
            mesoCiclo: nuevoMeso,
            microCiclos: microciclos
        });
    } catch (error) {
        console.error('Error al crear mesociclo automático:', error);
        res.status(500).json({ error: 'Error al crear mesociclo automático', details: error.message });
    }
};

module.exports = { CrearMesoCicloAutomatico };
