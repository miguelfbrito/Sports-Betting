const express = require('express');
const router = express.Router();
const AvailableBetTypes = require('../controllers/availablebettypes');

router.get('/', async (req, res, next) => {
    res.send('Available Bet Type routes')
});

router.post('/verifybettype', async (req, res, next) => {

    const bettypeOid = req.body.bettypeOid;
    const eventOid = req.body.eventOid;

    const data = await AvailableBetTypes.betTypeExistsInEvent(bettypeOid, eventOid)


    if (data.length === 0) {
        res.send({ message: "Invalid bet type" })
    } else {
        res.send(data);
    }

});

module.exports = router;