const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificaciones', {
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
    tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "no_leida"
    },
    prioridad: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "media"
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'notificaciones',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificaciones_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
