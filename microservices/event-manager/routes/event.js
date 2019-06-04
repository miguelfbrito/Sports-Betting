const express = require('express');
const router = express.Router();
const Event = require('../controllers/event');

router.get('/', async (req, res, next) => {
  res.send('Event routes')
});

router.post('/create', async (req, res, next) => {
  console.log(req.body)
  const newEvent = await Event.create(req.body)
  res.json(newEvent)
})

module.exports = router;
