"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE TYPE
      "enum_factura_estado" AS ENUM ('VIGENTE', 'ANULADA');`);

    await queryInterface.addColumn("factura", "estado", {
      type: "enum_factura_estado",
      allowNull: false,
      defaultValue: "VIGENTE",
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("factura", "estado");

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_factura_estado"; `);
  },
};
