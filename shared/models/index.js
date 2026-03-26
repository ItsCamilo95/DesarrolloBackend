const {sequelize} = require('../../config/database');
const Atletas = require('./Atletas');
const EntrenamientoFlash = require('./EntrenamientoFlash');
const EntrenamientoDiario = require('./EntrenamientoDiario');
const MacroCiclo = require('./MacroCiclo');
const MesoCiclo = require('./MesoCiclo');
const MicroCiclo = require('./MicroCiclo');
const Chequeo = require('./Chequeo');
const Notas = require('./Notas');
const ResultadoChequeo = require('./ResultadoChequeo');



const synCmodels = async () => {
    try {
        await sequelize.sync();
        console.log('Modelos sincronizados correctamente');
    }
    catch(error){
        console.error('Error al sincronizar los modelos:', error);
    }

}

module.exports = {
    synCmodels,
    Atletas, 
    MacroCiclo,
    MesoCiclo,
    MicroCiclo,
    EntrenamientoFlash,
    EntrenamientoDiario,
    Chequeo,
    Notas,
    ResultadoChequeo
}
