const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const axios = require('axios');

const eventRouter = require('./routes/event');
const availableBetTypesRouter = require('./routes/availablebettypes');
const statsRouter = require('./routes/stats');

// For test
const sports = require('./controllers/sport');
const events = require('./controllers/event');
const stats = require('./controllers/stats');
const availablebetypes = require('./controllers/availablebettypes');
const HandleEventsTiming = require('./controllers/handleEventsTiming');

const app = express();

require('dotenv').config();

global.MS_BETS = process.env.MS_BETS;
global.MS_USERS = process.env.MS_USERS;
global.MS_USERS = process.env.MS_USERS;
global.MS_LIST_EVENTS = process.env.MS_LIST_EVENTS;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/event', eventRouter);
app.use('/availablebettype', availableBetTypesRouter);
app.use('/stats', statsRouter);


seedData = async () => {

    console.log("\n\n\n\n\n\n\n\n\n\nSeeding data to the database!")

    // Create sports
    await sports.create({ name: 'Football' });
    await sports.create({ name: 'Basketball' });

    // Create event
    await events.createEvent({
        name: "Evento de Teste 2",
        ispremium: false,
        startingdate: (Date.now() + 45 * 1000),
        finishingdate: (Date.now() + 90 * 1000),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    });

    await events.createEvent({
        name: "Evento de Teste 4",
        ispremium: true,
        startingdate: Date.now() + 10 * 1000,
        finishingdate: Date.now() + 30 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    console.log("Creating event");

    // Create user
    await axios.post(`${MS_USERS}/user/signup`, {
        username: "user",
        password: "pass"
    })
    console.log("Creating user");

    // Place bet
    await axios.post(`${MS_BETS}/bet/place`, {
        wager: 19,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 2
    })

    // Create Stats
    // const statsData = await stats.addStatToEvent({
    //     eventOid: 1,
    //     userOid: 1,
    //     stats: {
    //         gameduration: 90,
    //         homegoals: 4,
    //         awaygoals: 3,
    //         homeredcards: 2,
    //         awayredcards: 1,
    //         homeyellowcards: 1,
    //         awayyellowcards: 3
    //     }
    // })

    // console.log("Stats do evento criado", statsData)

    // const closeAndVerifyBets = await events.closeAndVerifyBets({ oid: 1 });

    setInterval(eventsTiming, 20000);

}

eventsTiming = async () => {
    console.log("Executing events timing!")
    await HandleEventsTiming.verify();
}



setTimeout(seedData, 1000);


module.exports = app;
