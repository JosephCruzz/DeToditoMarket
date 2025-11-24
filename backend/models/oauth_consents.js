const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_consents', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    scopes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    granted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    revoked_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'oauth_consents',
    schema: 'auth',
    timestamps: false,
    indexes: [
      {
        name: "oauth_consents_active_client_idx",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "oauth_consents_active_user_client_idx",
        fields: [
          { name: "user_id" },
          { name: "client_id" },
        ]
      },
      {
        name: "oauth_consents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "oauth_consents_user_client_unique",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "client_id" },
        ]
      },
      {
        name: "oauth_consents_user_order_idx",
        fields: [
          { name: "user_id" },
          { name: "granted_at", order: "DESC" },
        ]
      },
    ]
  });
};
