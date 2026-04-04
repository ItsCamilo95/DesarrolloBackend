const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Usuarios = sequelize.define('Usuarios', {
    ID_Usuario: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    Correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    Contraseña: { type: DataTypes.STRING, allowNull: false },
    Telefono: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: 'Usuarios',
    timestamps: false
});

module.exports = Usuarios;
