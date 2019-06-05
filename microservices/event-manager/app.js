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
        name: "Evento1234564",
        ispremium: true,
        startingdate: Date.now(),
        state: 'Upcoming'
    }

    // const dataEvent = await events.create(event);
    // console.log(dataEvent.dataValues)

    // const updateEvent = {
    //     name: "NOME1",
    //     ispremium: false
    // }

    // const updateEventData = await events.update({ where: { name: 'Evento123' } }, updateEvent)
    // console.log(updateEventData)

    // const createEventSport = await events.createEvent(event, { name: 'Football' })

    // console.log("Teste!")
    // console.log(createEventSport)


    const fetchEvent = await events.fetch();
    console.log("TESTE")

    fetchEvent.forEach(e => console.log(e.dataValues))

}

// testFunction();

module.exports = app;
