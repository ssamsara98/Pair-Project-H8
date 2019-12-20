var express = require('express');
var router = express.Router();
const { User, Skill, UserSkill } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/all", (req, res, next) => {
  User.findAll()
  .then((result) => {
    res.send(result);
  }).catch((err) => {
    console.error(err);
    res.redirect("/");
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({
    include: [Skill],
    where: {
      id
    }
  })
  .then((user) => {
    if (user) {
      res.render("./pages/user", { user });
    }
    else {
      res.redirect("/");
    }
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/")
  });
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: {
      id
    }
  })
  .then((user) => {
    if (user) {
      res.render("pages/userEdit", {user})
    }
    else {
      res.redirect("/")
    }
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/");
  });
});

router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  let user = null;
  User.destroy({
    include: [Skill],
    where: {
      id
    }
  })
  .then(() => {
    return UserSkill.destroy({
      where: {
        UserId: id
      }
    })
  })
  .then(() => {
    res.redirect("/")
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/")
  });
});

router.get("/:id/add-skill", (req, res) => {
  Skill.findAll()
  .then((skills) => {
    res.render("pages/userAddSkill", {skills})
  }).catch((err) => {
    console.error(err);
    res.redirect("/")
  });
})

// POST
router.post("/:id/edit", (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: {
      id
    }
  })
  .then(() => {
    res.redirect(`/users/${id}`)
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/")  
  });
});

router.post("/:id/add-skill", (req, res) => {
  req.body.UserId = req.params.id;
  UserSkill.create()
  .then(() => {
    res.redirect("/")
  }).catch((err) => {
    console.error(err);
    res.redirect("/")
  });
})

module.exports = router;
