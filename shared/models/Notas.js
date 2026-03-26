const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const Notas = sequelize.define('Notas', {
    ID_Nota: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Nombre: { type: DataTypes.STRING, allowNull: true },
    Descripcion: { type: DataTypes.STRING, allowNull: true },
    EntrenamientoDiario_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'EntrenamientoDiario',   // nombre EXACTO de la tabla
        key: 'ID_EntrenamientoDiario'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },

}, {
  tableName: 'Notas',
  timestamps: false
})

module.exports = Notas;