'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   const fs = require('fs')
const dataSkill = JSON.parse(fs.readFileSync('./skilldata.json','utf8'))
const arr = []
for (let i = 0; i < dataSkill.length; i++) {
  arr.push({
    SkillName : dataSkill[i].SkillName,
    createdAt : new Date,
    updatedAt : new Date
  })  
}

return queryInterface.bulkInsert('Skills', arr, {Sequelize});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
     return queryInterface.bulkDelete('Skills', null, {});
  }
};
