const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const MesoCiclo = sequelize.define('MesoCiclo', {
    ID_MesoCiclo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    Nombre: { type: DataTypes.STRING, allowNull: true },
    Tipo: { type: DataTypes.STRING, allowNull: true },
    Semanas: { type: DataTypes.TINYINT, allowNull: true },
    Volumen: { type: DataTypes.FLOAT, allowNull: true },    
    Intensidad: { type: DataTypes.FLOAT, allowNull: true },  
    Objetivos: { type: DataTypes.STRING, allowNull: true },
    Periodo: { type: DataTypes.STRING, allowNull: true },
    FechaInicio: { type: DataTypes.DATE, allowNull: true },
    FechaFin: { type: DataTypes.DATE, allowNull: true },
    MacroCiclo_FK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MacroCiclo',
            key: 'ID_MacroCiclo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'MesoCiclo',
    timestamps: false
});

module.exports = MesoCiclo;
