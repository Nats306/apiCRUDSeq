'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("usuario", "estado", {
      type: Sequelize.ENUM("Activo", "Inactivo"),
      allowNull: false,
      defaultValue: "Activo",
    });
  },
 
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("usuario", "estado");
  }
};