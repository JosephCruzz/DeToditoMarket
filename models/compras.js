const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compras', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proveedores',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "activo"
    }
  }, {
    sequelize,
    tableName: 'compras',
    schema: 'public',
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "actualizado_en",
    indexes: [
      {
        name: "compras_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
