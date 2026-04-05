const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const EntrenamientoDiario = sequelize.define('EntrenamientoDiario', {
    ID_EntrenamientoDiario: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    MicroCiclo_FK: {type:DataTypes.INTEGER, allowNull: true,
    references: {
        model: 'MicroCiclo',   // nombre EXACTO de la tabla
        key: 'ID_MicroCiclo'    // clave primaria del modelo MacroCiclo
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
    },
    Fecha: { type: DataTypes.DATE, allowNull: true },
    HoraInicio: { type: DataTypes.TIME, allowNull: true },
    Tipo: { type: DataTypes.STRING, allowNull: true },
    Descripcion: { type: DataTypes.STRING, allowNull: true },
    Sitio: { type: DataTypes.STRING, allowNull: true }
},{
    tableName: 'EntrenamientoDiario',
    timestamps: false
})

module.exports = EntrenamientoDiario; 