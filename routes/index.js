const express = require('express');
const router = express.Router();
const { User } = require('../models');

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
router.post("/signup", (req, res) => {
  res.send({body: req.body, userModel: console.log(User)});
})

module.exports = router;
