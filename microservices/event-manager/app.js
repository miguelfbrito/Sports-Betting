const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const eventRouter = require('./routes/event');
const app = express();

// For test
const sports = require('./controllers/sport');
const events = require('./controllers/event');
const availablebetypes = require('./controllers/availablebettypes');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/event', eventRouter);

global.MS_BETS = process.env.MS_BETS || ''
global.MS_USERS = process.env.MS_USERS || ''

testFunction = async () => {
    const sport = {
        name: 'Football'
    }
    const data = await sports.create(sport);
    // console.log(data.dataValues)


    const event = {
        name: "Evento1",
        ispremium: true,
        startingdate: Date.now(),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    }

    const dataEvent = await events.createEvent(event);
    console.log('Creating event', dataEvent)

    // const updateEvent = {
    //     name: "NOME1",
    //     ispremium: false
    // }

    // const updateEventData = await events.update({ where: { name: 'Evento123' } }, updateEvent)
    // console.log(updateEventData)

    // const createEventSport = await events.createEvent(event, { name: 'Football' })

    // console.log("Teste!")
    // console.log(createEventSport)


    // const fetchEvent = await events.fetch();


}

setTimeout(testFunction, 5000);

module.exports = app;
