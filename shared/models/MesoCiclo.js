const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const MesoCiclo = sequelize.define('MesoCiclo', {
    ID_MesoCiclo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Nombre: { type: DataTypes.STRING, allowNull: true },
    Tipo: { type: DataTypes.STRING, allowNull: true },
    Semanas: { type: DataTypes.TINYINT, allowNull: true },
    Volumen: { type: DataTypes.STRING, allowNull: true },
    Intensidad: { type: DataTypes.STRING, allowNull: true },
    Objetivos: { type: DataTypes.STRING, allowNull: true },
    FechaInicio: { type: DataTypes.DATE, allowNull: true },
    FechaFin: { type: DataTypes.DATE, allowNull: true },
    MacroCiclo_FK: {type:DataTypes.INTEGER, allowNull: false,
    references: {
        model: 'MacroCiclo',   // nombre EXACTO de la tabla
        key: 'ID_MacroCiclo'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    } // Debajo de este atributo iria el siguiente
},{
    tableName: 'MesoCiclo',
    timestamps: false
})

module.exports = MesoCiclo; 