const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const axios = require('axios');

const eventRouter = require('./routes/event');
const availableBetTypesRouter = require('./routes/availablebettypes');
const statsRouter = require('./routes/stats');
const app = express();

// For test
const sports = require('./controllers/sport');
const events = require('./controllers/event');
const stats = require('./controllers/stats');
const availablebetypes = require('./controllers/availablebettypes');

require('dotenv').config();

global.MS_BETS = process.env.MS_BETS || ''
global.MS_USERS = process.env.MS_USERS || ''

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
    const dataEvent = await events.createEvent({
        name: "Evento de Teste 2",
        ispremium: true,
        startingdate: Date.now(),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    });

    await events.createEvent({
        name: "Evento de Teste 3",
        ispremium: true,
        startingdate: Date.now(),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    });

    console.log("Creating event");

    // Create user
    const userData = await axios.post(`${MS_USERS}/user/signup`, {
        username: "user",
        password: "pass"
    })
    console.log("Creating user");

    // Place bet
    const betData = await axios.post(`${MS_BETS}/bet/place`, {
        wager: 10,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 5
    })
    console.log("Betting data", betData.data);

    // Create Stats
    const statsData = await stats.addStatToEvent({
        eventOid: 1,
        userOid: 1,
        stats: {
            gameduration: 90,
            homeGoals: 2,
            awayGoals: 3,
            homeRedCards: 2,
            awayRedCards: 1,
            homeYellowCards: 1,
            awayYellowCards: 3
        }
    })
    console.log("Creating stats", statsData);

    const closeAndVerifyBets = await events.closeAndVerifyBets({ oid: 1 });

}

setTimeout(seedData, 3000);

module.exports = app;
