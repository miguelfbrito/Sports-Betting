const express = require('express');
const router = express.Router();
const BetType = require('../controllers/bettype');

router.get('/', async (req, res, next) => {
    res.json('hi')
});

router.get('/:name', async (req, res, next) => {

    const data = await BetType.findByname(req.params.name);

    res.json(data)
});

module.exports = router;
