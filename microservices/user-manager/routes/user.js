const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const UserC = require('../controllers/user');

const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get('/', async (req, res, next) => {
  console.log("Creating user!")
  let user = await User.create({ username: "mbrito", password: "pass" });
  res.json(user)
});

router.get('/teste', async (req, res, next) => {
  const data = await UserC.findOne({ username: 'mbrito' })
  res.json(data);
})


router.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {

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


router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.jsonp({
          message: info.message,
          token: null,
          success: false
        })
      }

      req.login(user, {
        session: false
      }, async (err) => {
        if (err) return next(err)

        const userInfoInToken = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }

        // Geração do token
        const token = jwt.sign({
          user: userInfoInToken
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
          })

        return res.jsonp({
          message: info.message,
          token: token,
          success: true
        })
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next)
})



module.exports = router;
