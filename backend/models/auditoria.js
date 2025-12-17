<<<<<<< HEAD
=======
//se elimino fecha

>>>>>>> develop
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
<<<<<<< HEAD
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
=======
>>>>>>> develop
    },
    {
      sequelize,
      tableName: "auditoria",
      schema: "public",
<<<<<<< HEAD
      timestamps: false,
=======
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
>>>>>>> develop
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
