const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objects', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Field is deprecated, use owner_id instead"
    },
    last_accessed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    path_tokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'objects',
    schema: 'storage',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "bucketid_objname",
        unique: true,
        fields: [
          { name: "bucket_id" },
          { name: "name" },
        ]
      },
      {
        name: "idx_name_bucket_level_unique",
        unique: true,
        fields: [
          { name: "name", collate: "C" },
          { name: "bucket_id" },
          { name: "level" },
        ]
      },
      {
        name: "idx_objects_bucket_id_name",
        fields: [
          { name: "bucket_id" },
          { name: "name", collate: "C" },
        ]
      },
      {
        name: "idx_objects_lower_name",
        fields: [
          { name: "bucket_id" },
          { name: "level" },
        ]
      },
      {
        name: "name_prefix_search",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "objects_bucket_id_level_idx",
        unique: true,
        fields: [
          { name: "bucket_id" },
          { name: "level" },
          { name: "name", collate: "C" },
        ]
      },
      {
        name: "objects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
