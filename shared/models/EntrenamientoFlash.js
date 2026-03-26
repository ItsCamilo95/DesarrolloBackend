const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const EntrenamientoFlash = sequelize.define('EntrenamientoFlash', {
    ID_EntrenamientoFlash: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true  },
    Nombre: { type: DataTypes.STRING, allowNull: true },
    Descripcion: { type: DataTypes.STRING, allowNull: true },
    Duracion: { type: DataTypes.STRING, allowNull: true },
    Categoria: { type: DataTypes.STRING, allowNull: true },

}, {
  tableName: 'EntrenamientoFlash',
  timestamps: false
})

module.exports = EntrenamientoFlash;