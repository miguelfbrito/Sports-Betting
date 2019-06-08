var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({ "route": "Bets" })
});

router.get('/place', async (req, res, next) => {

})

module.exports = router;
