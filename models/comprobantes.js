const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comprobantes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'factura',
        key: 'id'
      }
    },
    caja_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'caja',
        key: 'id'
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "efectivo o transferencia"
    },
    numero_referencia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monto: {
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
    tableName: 'comprobantes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comprobantes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
