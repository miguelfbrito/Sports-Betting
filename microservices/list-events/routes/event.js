const express = require('express');
const router = express.Router();
const Event = require('../controllers/event');

router.get('/', async (req, res, next) => {
    res.send('List events routes')
});


router.post('/update', async (req, res, next) => {

    const listEvents = req.body

    try {
        const newEvent = await Event.updateAvailable(listEvents);
        res.send(newEvent);
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error updating events' })
    }
})

module.exports = router;
