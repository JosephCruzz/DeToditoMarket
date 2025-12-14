const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cai', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_cai: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "cai_codigo_cai_key"
    },
    rango_inicial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rango_final: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_autorizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_limite_emision: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "activo"
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cai',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cai_codigo_cai_key",
        unique: true,
        fields: [
          { name: "codigo_cai" },
        ]
      },
      {
        name: "cai_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
