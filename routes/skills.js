var express = require('express');
var router = express.Router();
const Skill = require('../models').Skill

/* GET users listing. */
router.get('/',(req, res, next)=> {
  Skill.findAll({ order: [["id"]] }) //include:SubjectStudent
      .then(skills => {
        res.render("./pages/skills", { skills });
      })
      .catch(err => {
        res.send(err);
      });
});

router.get('/add', function(req, res, next) {
  res.render("pages/addSkill");
});

router.post('/add',(req,res)=>{
  Skill.create({
    SkillName: req.body.SkillName
  })
    .then(() => {
      res.redirect("/skills");
    })
    .catch(err => {
      console.log(err)
      // res.render("./student/addstudent");
    });
})


module.exports = router;

