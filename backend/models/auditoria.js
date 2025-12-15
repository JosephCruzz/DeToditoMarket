const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "auditoria",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "producto",
          key: "id",
        },
      },
      entrada_salida: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      tableName: "auditoria",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "auditoria_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
