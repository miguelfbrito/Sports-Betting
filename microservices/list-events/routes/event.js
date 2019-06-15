const express = require('express');
const router = express.Router();
const Event = require('../controllers/event');

router.get('/', async (req, res, next) => {

    // TODO : Obter token, verificar se o user é Premium
    // - Enviar dados de acordo com estatuto de premium

    const isUserPremium = false;

    try {
        let data = await Event.fetchAll();
        // data = data.filter(event => event.dataValues.ispremium)

        res.send(data);
    } catch (e) {
        res.status(500).send({ message: 'Error fetching events' })
    }
});




router.post('/update', async (req, res, next) => {

    let listEvents = req.body

    try {
        const newEvent = await Event.updateAvailable(listEvents);
        res.send(newEvent);
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error updating events' })
    }
})

module.exports = router;
