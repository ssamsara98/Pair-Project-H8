var express = require('express');
var router = express.Router();
const {Skill, UserSkill} = require('../models');

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

router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  Skill.destroy({
    where: {
      id
    }
  })
  .then(() => {
    return UserSkill.destroy({
      where: {
        SkillId: id
      }
    })
  })
  .then(() => {
    res.redirect("/skills")
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/")
  });
})

router.get('/add', function(req, res, next) {
  res.render("pages/addSkill");
});

router.post('/add',(req,res)=>{
  console.log(req.body);
  Skill.create({
    SkillName: req.body.SkillName
  })
    .then(() => {
      res.redirect("/skills");
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    });
});

module.exports = router;

