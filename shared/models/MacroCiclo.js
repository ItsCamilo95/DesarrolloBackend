const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const MacroCiclo = sequelize.define('MacroCiclo', {
    ID_MacroCiclo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Nombre: { type: DataTypes.STRING, allowNull: true },
    FechaInicio: { type: DataTypes.DATE, allowNull: true },
    FechaFin: { type: DataTypes.DATE, allowNull: true },
    Objetivo_Principal: { type: DataTypes.STRING, allowNull: true },
    Competencia_Meta: { type: DataTypes.STRING, allowNull: true },
    Descripcion: { type: DataTypes.STRING, allowNull: true },
    Atleta_FK: {type: DataTypes.INTEGER,allowNull: false,
    references: {
        model: 'Atletas',   // nombre EXACTO de la tabla
        key: 'ID_Atleta'    // clave primaria del modelo Atletas
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    } // Debajo de este atributo iria el siguiente

}, {
  tableName: 'MacroCiclo',
  timestamps: false
})

module.exports = MacroCiclo;
