"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      "permisos",
      "roles",
      "proveedores",
      "users",
      "compras",
      "caja",
      "notificaciones",
      "lote",
      "detalleCompra",
      "DetalleVenta",
      "auditoria",
      "comprobantes",
    ];

    for (const table of tables) {
      const sequenceName = `${table}_id_seq`;

      console.log(`Agregando autoincrement a la tabla: ${table}`);

      // Crear secuencia
      await queryInterface.sequelize.query(`
        CREATE SEQUENCE IF NOT EXISTS ${sequenceName};
      `);

      // Asignar secuencia a la columna id
      await queryInterface.sequelize.query(`
        ALTER TABLE "${table}" 
        ALTER COLUMN id SET DEFAULT nextval('${sequenceName}');
      `);

      // Vincular secuencia a la tabla
      await queryInterface.sequelize.query(`
        ALTER SEQUENCE ${sequenceName} OWNED BY "${table}".id;
      `);

      // Establecer valor inicial basado en el máximo actual
      await queryInterface.sequelize.query(`
        SELECT setval('${sequenceName}', COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1, false);
      `);
    }

    console.log("✅ Autoincrement agregado a todas las tablas");
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      "permisos",
      "roles",
      "proveedores",
      "users",
      "producto",
      "compras",
      "caja",
      "notificaciones",
      "lote",
      "detalleCompra",
      "DetalleVenta",
      "factura",
      "cal",
      "auditoria",
      "comprobantes",
    ];

    for (const table of tables) {
      const sequenceName = `${table}_id_seq`;

      console.log(`Revirtiendo autoincrement de la tabla: ${table}`);

      // Eliminar el default
      await queryInterface.sequelize.query(`
        ALTER TABLE "${table}" ALTER COLUMN id DROP DEFAULT;
      `);

      // Eliminar la secuencia
      await queryInterface.sequelize.query(`
        DROP SEQUENCE IF EXISTS ${sequenceName};
      `);
    }

    console.log("✅ Autoincrement revertido de todas las tablas");
  },
};
