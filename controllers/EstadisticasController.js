const { Op } = require('sequelize');
const EntrenamientoDiario = require('../shared/models/EntrenamientoDiario');
const Chequeo = require('../shared/models/Chequeo');
const ResultadoChequeo = require('../shared/models/ResultadoChequeo');
const MicroCiclo = require('../shared/models/MicroCiclo');
const MesoCiclo = require('../shared/models/MesoCiclo');
const MacroCiclo = require('../shared/models/MacroCiclo');

const ObtenerEstadisticas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin, atletaId } = req.body;

        // Filtro de fechas
        const filtroFecha = {
            [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
        };

        // 1. Buscar los MacroCiclos del atleta (si se pasa atletaId)
        let macroIds = [];
        if (atletaId) {
            const macros = await MacroCiclo.findAll({ where: { Atleta_FK: atletaId } });
            macroIds = macros.map(m => m.ID_MacroCiclo);
        }

        // 2. Buscar los MesoCiclos de esos MacroCiclos
        let mesoIds = [];
        if (macroIds.length > 0) {
            const mesos = await MesoCiclo.findAll({ where: { MacroCiclo_FK: macroIds } });
            mesoIds = mesos.map(ms => ms.ID_MesoCiclo);
        }

        // 3. Buscar los MicroCiclos de esos MesoCiclos
        let microIds = [];
        if (mesoIds.length > 0) {
            const micros = await MicroCiclo.findAll({ where: { MesoCiclo_FK: mesoIds } });
            microIds = micros.map(mc => mc.ID_MicroCiclo);
        }

        // --- Entrenamientos ---
        const entrenamientos = await EntrenamientoDiario.findAll({
            where: {
                Fecha: filtroFecha,
                ...(microIds.length > 0 ? { MicroCiclo_FK: microIds } : {})
            }
        });

        const conteoEntrenamientos = {};
        for (const ent of entrenamientos) {
            const tipo = ent.Tipo || 'SinTipo';
            conteoEntrenamientos[tipo] = (conteoEntrenamientos[tipo] || 0) + 1;
        }

        // --- Chequeos ---
        const chequeos = await Chequeo.findAll({
            where: {
                Fecha: filtroFecha,
                ...(microIds.length > 0 ? { MicroCiclo_FK: microIds } : {})
            }
        });

        const resultados = await ResultadoChequeo.findAll({
            where: {
                Chequeo_FK: chequeos.map(c => c.ID_Chequeo)
            }
        });

        const conteoChequeos = {};
        for (const r of resultados) {
            const atributo = r.Atributo || 'SinAtributo';
            conteoChequeos[atributo] = (conteoChequeos[atributo] || 0) + 1;
        }

        res.status(200).json({
            message: 'Estadísticas generadas exitosamente',
            rango: { inicio: fechaInicio, fin: fechaFin },
            atleta: atletaId || 'Todos',
            totalEntrenamientos: entrenamientos.length,
            entrenamientosPorTipo: conteoEntrenamientos,
            totalChequeos: resultados.length,
            chequeosPorAtributo: conteoChequeos
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ error: 'Error al obtener estadísticas', details: error.message });
    }
};

module.exports = { ObtenerEstadisticas };
