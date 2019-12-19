const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("pages/home")
});

router.get("/signup", (req, res) => {
  res.render("pages/signup")
})

router.get("/login", (req, res) => {
  res.render("pages/login");
});

/* POST */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    where: {
      email
    }
  })
  .then((result) => {
    bcrypt.compare(password, result.password, (err, isValid) => {
      if (isValid) {
        res.send(result);
      }
      else {
        res.redirect("/");
      }
    })
  })
  .catch((err) => {
    console.error(err);
    res.redirect("/");
  });
})

router.post("/signup", (req, res) => {
  User.create(req.body)
  .then(() => {
    res.redirect("/users/all");
  }).catch((err) => {
    console.error(err);
    res.redirect("/");
  });
});

module.exports = router;
