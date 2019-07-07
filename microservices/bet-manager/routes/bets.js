const express = require('express');
const router = express.Router();
const Bet = require('../controllers/bet');

router.get('/', async (req, res, next) => {
    res.json({ "route": "Bets" })
});

router.get('/', async (req, res, next) => {

})

router.post('/closebet', async (req, res, next) => {

    try {
        const data = await Bet.closeBet(req.body);
        res.send(data)
    } catch (e) {
        res.status(500).send({ message: `Error closing bet, ${e}` })
    }

});

router.get('/fetchall/:userOid', async (req, res, next) => {

    const userOid = req.params.userOid

    console.log("USER OID NO FETCHALL ", userOid)
    try {
        const betHistory = await Bet.history(userOid);
        res.send(betHistory);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Error fetching user bet history' })
    }

});

router.get('/fetchbyeventoid/:eventoid', async (req, res, next) => {

    const eventOid = req.params.eventoid || -1;

    try {
        const bets = await Bet.fetchBetsByEventOid(eventOid);
        res.send(bets);
    } catch (e) {
        res.status(500).send({ message: 'Error fetching bets by eventOid' })
    }

});


router.post('/place', async (req, res, next) => {

    const bet = req.body;

    console.log('\n\n\n\n\n');
    console.log(bet);
    console.log('\n\n\n\n\n');

    const newBet = {
        wager: bet.wager,
        userOid: bet.userOid || 1, // 'TODO: OBTER DO TOKEN'
        eventOid: bet.eventOid,
        bettypeOid: bet.bettypeOid
    }

    try {
        const placedBet = await Bet.placeBet(newBet);
        res.send(placedBet);
    } catch (e) {
        console.error(e)
        res.status(500).send({ message: 'Error placing bet!' })
    }

})

module.exports = router;
