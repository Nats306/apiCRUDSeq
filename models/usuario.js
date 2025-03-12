'use strict';
const { Model, DataTypes } = require('sequelize');
const bycrypt = require('bcryptjs');
 
module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      // Definir asociaciones aquí si es necesario
    }

    async validarContrasena(password){
      return await bycrypt.compare(password, this.password); //Comparar la contraseña con la contraseña cifrada
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuario", // Especificar nombre de la tabla
      timestamps: true, // Agrega createdAt y updatedAt

      hooks:{
        beforeCreate: async (usuario) => {
          const cifrado = await bycrypt.getSalt(10); //Obtener un hash cifrada con una complejidad de 10
          usuario.password = await bycrypt.hash(usuario.password, cifrado); //Cifrar la contraseña
        }
      }
    }
  );
 
  return Usuario;
};