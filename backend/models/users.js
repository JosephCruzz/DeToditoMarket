module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    carrera: {
      type: DataTypes.STRING,
      allowNull: true
    },
    auto: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = function(models) {
    User.hasMany(models.Publicacion, { foreignKey: 'idUser', as: 'publicaciones' });
    User.hasMany(models.Comentario, { foreignKey: 'idUser', as: 'comentarios' });
    User.hasMany(models.Fuente, { foreignKey: 'idUser', as: 'fuentes' });
    User.belongsToMany(models.Fuente, { through: models.Asistencia, foreignKey: 'idUsuario', as: 'eventosAsistidos' });
  };

  return User;
};