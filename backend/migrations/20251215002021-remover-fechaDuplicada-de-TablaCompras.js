'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('compras', 'fecha');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('compras', 'fecha', {
      type: DataTypes.DATE,
      allowNull: true,
    });
  }
};
