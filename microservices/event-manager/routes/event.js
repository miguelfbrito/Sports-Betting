const express = require('express');
const router = express.Router();
const Event = require('../controllers/event');

router.get('/', async (req, res, next) => {
    res.send('Event routes')
});

router.get('/ispremium/:eventOid', async (req, res, next) => {

    if (!req.params.eventOid) {
        res.send({ message: 'Invalid event' })
    }

    const isPremium = await Event.isPremium(req.params.eventOid)

    if (isPremium === -1) {
        res.send({ message: 'Event not found' })
    }

    res.send({
        eventOid: req.params.eventOid,
        ispremium: isPremium
    })

})

router.get('/history/:eventOid', async (req, res, next) => {
    try {
        let data = await Event.fetchOne({ where: { oid: req.params.eventOid } });

        res.send(data);
    } catch (e) {
        res.status(500).send({ message: 'Error fetching events' })
    }
});

router.post('/create', async (req, res, next) => {

    console.log("BODY A CHEGAR")
    console.log(req.body)
    const data = req.body

    try {
        const newEvent = await Event.createEvent(data);
        res.send(newEvent);
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error creating event' })
    }
    /* 
    JSON Esperado
     const event = {
         name: 'Liga dos Campeões',
         ispremium: false,
         startingDate: Date.now(),
         state: 'Upcoming',
         sport: {
             name: 'Football'
         },
         bettypes: [
             { name: '1' },
             { name: 'X' },
             { name: '2' }
         ]
     }
     */
})

module.exports = router;
