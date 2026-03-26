const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const MicroCiclo = sequelize.define('MicroCiclo', {
    ID_MicroCiclo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    FechaInicio: { type: DataTypes.DATE, allowNull: true },
    FechaFin: { type: DataTypes.DATE, allowNull: true },
    Descripcion: { type: DataTypes.STRING, allowNull: true },
    TipoCiclo: { type: DataTypes.STRING, allowNull: true },
    MacroCiclo_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'MacroCiclo',   // nombre EXACTO de la tabla
        key: 'ID_MacroCiclo'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },
    MesoCiclo_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'MesoCiclo',   // nombre EXACTO de la tabla
        key: 'ID_MesoCiclo'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    } // Debajo de este atributo iria el siguiente
},{
    tableName: 'MicroCiclo',
    timestamps: false
})

module.exports = MicroCiclo; 