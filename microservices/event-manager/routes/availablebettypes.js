const express = require('express');
const router = express.Router();
const AvailableBetTypes = require('../controllers/availablebettypes');

// /availablebettype

router.get('/', async (req, res, next) => {
    res.send('Available Bet Type routes')
});

router.get('/byeventoid/:eventOid', async (req, res, next) => {

    if (!req.params.eventOid) {
        res.send({ message: 'Missing parameters' })
    }

    try {
        const data = await AvailableBetTypes.fetchByEventOidWithBetTypeName(req.params.eventOid);
        res.send(data);

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Error fetching availablebettypes by eventOid' })
    }
})

router.post('/verifybettype', async (req, res, next) => {

    const bettypeOid = req.body.bettypeOid;
    const eventOid = req.body.eventOid;

    const data = await AvailableBetTypes.betTypeExistsInEvent(bettypeOid, eventOid)

    res.send(data);

});

module.exports = router;