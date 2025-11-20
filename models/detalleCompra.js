const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalleCompra', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'producto',
        key: 'id'
      }
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'compras',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detalleCompra',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "detalleCompra_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
