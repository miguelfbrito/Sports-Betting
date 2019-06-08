const express = require('express');
const router = express.Router();
const Event = require('../controllers/event');

router.get('/', async (req, res, next) => {
    res.send('Event routes')
});

router.post('/create', async (req, res, next) => {

    console.log(req.body)
    const data = req.body

    try {
        const newEvent = await Event.createEvent(data);

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


    const newEvent = await Event.create(req.body)
    res.send(newEvent);
})

module.exports = router;
