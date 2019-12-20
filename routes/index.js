const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const haser = require('../helpers/hasher');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  if (req.session.loggedIn) {
    res.locals.loggedIn = true;
    next()
  }
  else {
    res.render("pages/home")
  }
}, (req, res) => {
  res.render("pages/home")
});

router.get("/signup", (req, res) => {
  res.render("pages/signup")
})

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    console.error(err);
  })
  res.redirect("/")
})

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
        req.session.userId = result.id;
        req.session.email = result.email;
        req.session.password = haser(result.password);
        req.session.loggedIn = true;
        req.session.cookie.expires = 60 * 60 * 60 * 24;
        res.redirect("/");
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
