const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('caja', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    fecha_apertura: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    fecha_cierre: {
      type: DataTypes.DATE,
      allowNull: true
    },
    saldo_inicial: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    saldo_final: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "abierta"
    }
  }, {
    sequelize,
    tableName: 'caja',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "caja_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
