const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles_permisos', {
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permisos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'roles_permisos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "roles_permisos_pkey",
        unique: true,
        fields: [
          { name: "rol_id" },
          { name: "permiso_id" },
        ]
      },
    ]
  });
};
