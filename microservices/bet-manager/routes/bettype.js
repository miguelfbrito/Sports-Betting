const express = require('express');
const router = express.Router();
const BetType = require('../controllers/bettype');

router.get('/', async (req, res, next) => {

    const data = await BetType.fetchAll();
    res.send(data);

});

router.get('/byid/:id', async (req, res, next) => {

    if (!req.params.id) {
        res.send({ message: 'Missing parameters' });
    }

    const data = await BetType.findById(req.params.id);
    res.json(data)

});

router.get('/:name', async (req, res, next) => {

    const data = await BetType.findByname(req.params.name);
    res.json(data)

});

module.exports = router;
