const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DetalleVenta', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'factura',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    descuento: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    total_linea: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "efectivo o transferencia"
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DetalleVenta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "DetalleVenta_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
