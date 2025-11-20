const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buckets_analytics', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("STANDARD","ANALYTICS"),
      allowNull: false,
      defaultValue: "ANALYTICS"
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "ICEBERG"
    }
  }, {
    sequelize,
    tableName: 'buckets_analytics',
    schema: 'storage',
    timestamps: true,
    indexes: [
      {
        name: "buckets_analytics_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
