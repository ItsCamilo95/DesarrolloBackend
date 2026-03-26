const { DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const Atletas = sequelize.define('Atletas', {
    ID_Atleta: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    Nombre: { type: DataTypes.STRING, allowNull: false },
    Apellido: { type: DataTypes.STRING, allowNull: false },
    Fecha_Nacimiento: { type: DataTypes.DATE, allowNull: false },
    Sexo: { type: DataTypes.STRING, allowNull: false },
    Documento: { type: DataTypes.STRING, allowNull: false },
    Tipo_Documento: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true },
    Telefono: { type: DataTypes.STRING, allowNull: false },
    Deporte: { type: DataTypes.STRING,allowNull: false },
    Disciplina: { type: DataTypes.STRING, allowNull: false },
    Categoria: { type: DataTypes.STRING, allowNull: false },
    Nivel: { type: DataTypes.STRING, allowNull: false },
    Peso: { type: DataTypes.FLOAT, allowNull: false },
    Talla: { type: DataTypes.FLOAT, allowNull: false },
    Fecha_Registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Observaciones: { type: DataTypes.STRING, allowNull: false },
    Estado:{ type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'Atletas',
  timestamps: false
})
module.exports = Atletas;