const express = require('express');
const router = express.Router();
const Sport = require('../controllers/sport');

router.get('/', async (req, res, next) => {
    res.send('Sport routes')
});

router.get('/allsports', async (req, res, next) => {
    try {
        let data = await Sport.fetchAll();

        res.send(data);
    } catch (e) {
        res.status(500).send({ message: 'Error fetching events' })
    }
});


module.exports = router;
