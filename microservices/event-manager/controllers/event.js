const Event = module.exports;
const EventDB = require('../models/event');

Event.createEvent = (event) => {

    // Validações

    return EventDB.create(event);

}