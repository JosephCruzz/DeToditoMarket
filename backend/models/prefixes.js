const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prefixes', {
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'prefixes',
    schema: 'storage',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "idx_prefixes_lower_name",
        fields: [
          { name: "bucket_id" },
          { name: "level" },
        ]
      },
      {
        name: "prefixes_pkey",
        unique: true,
        fields: [
          { name: "bucket_id" },
          { name: "level" },
          { name: "name" },
        ]
      },
    ]
  });
};
