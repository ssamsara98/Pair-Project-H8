'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Skill extends Model { }
  Skill.init(
    {
      SkillName: {
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: (uppercase, options) => {
          // do stuff
          uppercase.SkillName = uppercase.SkillName.toUpperCase()
        }
      },
      sequelize
    }
  );
  Skill.associate = function (models) {
    // associations can be defined here
    Skill.belongsToMany(models.User, { through: models.UserSkill })
  };
  return Skill;
};