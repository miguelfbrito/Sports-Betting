const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user')

require('dotenv').config();

router.get('/', async (req, res, next) => {
  console.log("Creating user!")
  let user = await User.create({ username: "mbrito", password: "pass" });
  res.json(user)
});


router.post('/teste', (req, res, next) => {

  res.send(req.body)
})

router.post('/signup', async (req, res, next) => {
  console.log(req.body)
  passport.authenticate('signup', async (err, user, info) => {
    try {

      console.log("Hello there")

      if (err) {
        return next(err)
      }

      if (!user) {
        return res.jsonp({
          message: info.message,
          success: false
        })
      }

      return res.jsonp({
        message: info.message,
        user: req.user,
        success: true
      })
    } catch (err) {
      return next(err)
    }

  })(req, res, next)
})



module.exports = router;
