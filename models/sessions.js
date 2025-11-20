const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    factor_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    aal: {
      type: DataTypes.ENUM("aal1","aal2","aal3"),
      allowNull: true
    },
    not_after: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired."
    },
    refreshed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ip: {
      type: DataTypes.INET,
      allowNull: true
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    oauth_client_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    refresh_token_hmac_key: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Holds a HMAC-SHA256 key used to sign refresh tokens for this session."
    },
    refresh_token_counter: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Holds the ID (counter) of the last issued refresh token."
    }
  }, {
    sequelize,
    tableName: 'sessions',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "sessions_not_after_idx",
        fields: [
          { name: "not_after", order: "DESC" },
        ]
      },
      {
        name: "sessions_oauth_client_id_idx",
        fields: [
          { name: "oauth_client_id" },
        ]
      },
      {
        name: "sessions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sessions_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id_created_at_idx",
        fields: [
          { name: "user_id" },
          { name: "created_at" },
        ]
      },
    ]
  });
};
