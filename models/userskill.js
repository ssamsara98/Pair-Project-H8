'use strict';
module.exports = (sequelize, DataTypes) => {
  // const UserSkill = sequelize.define('UserSkill', {
  //   UserId: DataTypes.INTEGER,
  //   SkillId: DataTypes.INTEGER,
  //   level: DataTypes.STRING
  // }, {});
  const Model = sequelize.Sequelize.Model;
  class UserSkill extends Model { }
  UserSkill.init({
    UserId: DataTypes.INTEGER,
    SkillId: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {
    sequelize
  })
  UserSkill.associate = function(models) {
    // associations can be defined here
    UserSkill.belongsTo(models.User, { foreignKey:"UserId" });
    UserSkill.belongsTo(models.Skill, { foreignKey: "SkillId" })
  };
  return UserSkill;
};