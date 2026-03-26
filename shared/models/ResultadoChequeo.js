const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const ResultadoChequeo = sequelize.define('ResultadoChequeo', {
    ID_Resultado: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Chequeo_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'Chequeo',   // nombre EXACTO de la tabla
        key: 'ID_Chequeo'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },
    Atributo: { type: DataTypes.STRING, allowNull: true },
    Valor: { type: DataTypes.INTEGER, allowNull: true },
    Unidad: { type: DataTypes.STRING, allowNull: true },

    

}, {
  tableName: 'ResultadoChequeo',
  timestamps: false
})

module.exports = ResultadoChequeo;