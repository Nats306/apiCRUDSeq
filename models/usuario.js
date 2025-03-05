'use strict';
const { Model, DataTypes } = require('sequelize');
 
module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      // Definir asociaciones aquí si es necesario
    }
  }
 
  Usuario.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
        allowNull: false,
        primaryKey: true, // Define 'id' como clave primaria
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Evita correos duplicados
      },
      estado:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Activo",
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuario", // Especificar nombre de la tabla
      timestamps: true, // Agrega createdAt y updatedAt
    }
  );
 
  return Usuario;
};