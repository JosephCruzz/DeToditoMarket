const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}
User.init(
  {
    primerNombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "Soy_una_Tabla_Prueba_Borrame",
  }
);

//console.log(User === sequelize.models.User);

module.exports = User;
