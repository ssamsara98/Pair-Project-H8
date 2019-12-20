const hasher = require('../helpers/hasher');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        instance.password = hasher(instance.password)
      }
    },
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Skill, { through: models.UserSkill, foreignKey:"UserId", otherKey: "SkillId" })
  };
  return User;
};