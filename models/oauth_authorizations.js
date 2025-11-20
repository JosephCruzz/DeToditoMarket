const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_authorizations', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    authorization_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    redirect_uri: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resource: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    code_challenge_method: {
      type: DataTypes.ENUM("s256","plain"),
      allowNull: true
    },
    response_type: {
      type: DataTypes.ENUM("code"),
      allowNull: false,
      defaultValue: "code"
    },
    status: {
      type: DataTypes.ENUM("pending","approved","denied","expired"),
      allowNull: false,
      defaultValue: "pending"
    },
    authorization_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('(now() + 00:03:00')
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'oauth_authorizations',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "oauth_auth_pending_exp_idx",
        fields: [
          { name: "expires_at" },
        ]
      },
      {
        name: "oauth_authorizations_authorization_code_key",
        unique: true,
        fields: [
          { name: "authorization_code" },
        ]
      },
      {
        name: "oauth_authorizations_authorization_id_key",
        unique: true,
        fields: [
          { name: "authorization_id" },
        ]
      },
      {
        name: "oauth_authorizations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
