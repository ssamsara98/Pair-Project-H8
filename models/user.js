const bcrypt = require('bcrypt');
const saltRounds = 10;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model { }
  User.init({
    name: DataTypes.STRING,
    emai: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    descripton: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    exp: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        bcrypt.hash(instance.password, saltRounds, (err, hash) => {
          instance.password = hash;
        });
      }
    },
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Skill, { through: models.UserSkill })
  };
  return User;
};