const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');

const eventRouter = require('./routes/event');
const app = express();

// For test
const sports = require('./controllers/sport');
const events = require('./controllers/event');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/event', eventRouter);

testFunction = async () => {
    const sport = {
        name: 'Football'
    }
    const data = await sports.create(sport);
    console.log(data.dataValues)


    const event = {
        name: "Evento1234",
        ispremium: true,
        startingdate: Date.now()
    }

    const dataEvent = await events.create(event);
    console.log(dataEvent.dataValues)

    const updateEvent = {
        name: "NOME",
        ispremium: false
    }

    const updateEventData = await events.update({ where: { name: 'Evento123' } }, updateEvent)
    console.log(updateEventData)
}

testFunction();

module.exports = app;
