'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('UserSkill', {
    UserId: DataTypes.INTEGER,
    SkillId: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {});
  UserSkill.associate = function(models) {
    // associations can be defined here
  };
  return UserSkill;
};