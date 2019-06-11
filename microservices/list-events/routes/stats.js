const express = require('express');
const router = express.Router();
const Stats = require('../controllers/stats');

router.get('/', async (req, res, next) => {
    res.send('Stats routes')
});

router.post('/create', async (req, res, next) => {

    console.log(req.body)
    const data = req.body

    /*
    Exemplo de dados
    const dataType = {
        eventOid: 1,
        stats: {
            gameduration: data.stats.gameduration || 90,

            homeGoals: data.stats.homegoals || 0,
            awayGoals: data.stats.awaygoals || 0,
            homeRedCards: data.stats.homeredcards || 0,
            awayRedCards: data.stats.awayredcards || 0,
            homeYellowCards: data.stats.homeyellowcards || 0,
            awayYellowCards: data.stats.awayyellowcards || 0
        },
        userOid: 1
    }*/

    try {
        const newStats = await Stats.addStatToEvent(data);
        res.send(newStats);
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error creating stats' })
    }
})

module.exports = router;
