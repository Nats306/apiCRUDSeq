'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Genera un UUID automáticamente
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true, // Evita duplicados
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
 
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuario");
  },
};