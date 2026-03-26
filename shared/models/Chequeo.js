const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const Chequeo = sequelize.define('Chequeo', {
    ID_Chequeo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Fecha: { type: DataTypes.DATE, allowNull: true },
    SemanaCiclo: { type: DataTypes.STRING, allowNull: true },
    Observaciones: { type: DataTypes.STRING, allowNull: true },
    EntrenamientoFlash_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'EntrenamientoFlash',   // nombre EXACTO de la tabla
        key: 'ID_EntrenamientoFlash'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },

}, {
  tableName: 'Chequeo',
  timestamps: false
})

module.exports = Chequeo;