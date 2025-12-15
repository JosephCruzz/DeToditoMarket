//se elimino fecha

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
    },
    {
      sequelize,
      tableName: "auditoria",
      schema: "public",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
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
