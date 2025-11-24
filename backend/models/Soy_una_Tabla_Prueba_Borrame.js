const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Soy_una_Tabla_Prueba_Borrame', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    primerNombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Soy_una_Tabla_Prueba_Borrame',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Soy_una_Tabla_Prueba_Borrame_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
