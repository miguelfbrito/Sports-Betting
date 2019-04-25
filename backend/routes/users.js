var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({msg : "Just a test"})
});

module.exports = router;
