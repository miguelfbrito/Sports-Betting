var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({ "route": "Bets" })
});

module.exports = router;
