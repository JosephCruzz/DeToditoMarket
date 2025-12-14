const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('factura', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cai_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cai',
        key: 'id'
      }
    },
    rtn_emisor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_emisor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion_emisor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_emisor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correo_emisor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombre_cliente: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rtn_cliente: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion_cliente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_cliente: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numero_factura: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "factura_numero_factura_key"
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "efectivo o transferencia"
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Lempira"
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    impuestos: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'factura',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "factura_numero_factura_key",
        unique: true,
        fields: [
          { name: "numero_factura" },
        ]
      },
      {
        name: "factura_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
