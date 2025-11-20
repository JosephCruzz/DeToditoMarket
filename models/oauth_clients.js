const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_clients', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    client_secret_hash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    registration_type: {
      type: DataTypes.ENUM("dynamic","manual"),
      allowNull: false
    },
    redirect_uris: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    grant_types: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    client_uri: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo_uri: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    client_type: {
      type: DataTypes.ENUM("public","confidential"),
      allowNull: false,
      defaultValue: "confidential"
    }
  }, {
    sequelize,
    tableName: 'oauth_clients',
    schema: 'auth',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "oauth_clients_deleted_at_idx",
        fields: [
          { name: "deleted_at" },
        ]
      },
      {
        name: "oauth_clients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
