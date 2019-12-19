'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    emai: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    descripton: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    exp: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};