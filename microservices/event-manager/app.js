const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const axios = require('axios');
const cors = require('cors');

const eventRouter = require('./routes/event');
const availableBetTypesRouter = require('./routes/availablebettypes');
const statsRouter = require('./routes/stats');
const sportRouter = require('./routes/sport');

// For test
const sports = require('./controllers/sport');
const events = require('./controllers/event');
const stats = require('./controllers/stats');
const availablebetypes = require('./controllers/availablebettypes');
const basketballstats = require('./controllers/basketballstats');
const HandleEventsTiming = require('./controllers/handleEventsTiming');


const app = express();



require('dotenv').config();

app.use(cors())
app.options('*', cors())


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
app.use('/sport', sportRouter);


seedData = async () => {

    console.log("\n\n\n\n\nSeeding data to the database!")

    // Create sports
    await sports.create({ name: 'Football' });
    await sports.create({ name: 'Basketball' });

    // Create event
    await events.createEvent({
        name: "Benfica x Porto",
        ispremium: false,
        startingdate: (Date.now() + 10 * 1000),
        finishingdate: (Date.now() + 20 * 1000),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    });

    await events.createEvent({
        name: "Arsenal x Liverpool",
        ispremium: false,
        startingdate: (Date.now() + 60 * 1000),
        finishingdate: (Date.now() + 4 * 60 * 1000),
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Barcelona x Real Madrid",
        ispremium: false,
        startingdate: Date.now() + 10 * 1000,
        finishingdate: Date.now() + 20 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Bayern vs Dortmund",
        ispremium: false,
        startingdate: Date.now() + 90 * 60 * 1000,
        finishingdate: Date.now() + 120 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Braga x Guimarães",
        ispremium: false,
        startingdate: Date.now() + 90 * 60 * 1000,
        finishingdate: Date.now() + 120 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Braga B x Guimarães",
        ispremium: true,
        startingdate: Date.now() + 90 * 60 * 1000,
        finishingdate: Date.now() + 120 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Real Madrid x Barcelona",
        ispremium: true,
        startingdate: Date.now() + 4 * 60 * 1000,
        finishingdate: Date.now() + 9 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Real Madrid B x Barcelona B",
        ispremium: true,
        startingdate: Date.now() + 5 * 60 * 1000,
        finishingdate: Date.now() + 9 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Sporting x Guimarães",
        ispremium: false,
        startingdate: Date.now() + 60 * 60 * 1000,
        finishingdate: Date.now() + 120 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Sporting x Leixões",
        ispremium: false,
        startingdate: Date.now() + 45 * 60 * 1000,
        finishingdate: Date.now() + 90 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Estoril x Setúbal",
        ispremium: false,
        startingdate: Date.now() + 10 * 1000,
        finishingdate: Date.now() + 300 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Football'
        }
    })

    await events.createEvent({
        name: "Toronto Raptors x Golden State Warriors",
        ispremium: false,
        startingdate: Date.now() + 1000,
        finishingdate: Date.now() + 20 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Basketball'
        }
    })

    await events.createEvent({
        name: "Atlanta Hawks x Boston Celtics",
        ispremium: false,
        startingdate: Date.now() + 5 * 60 * 1000,
        finishingdate: Date.now() + 7 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Basketball'
        }
    })

    await events.createEvent({
        name: "Chicago Bulls x Detroit Pistons",
        ispremium: true,
        startingdate: Date.now() + 4 * 60 * 1000,
        finishingdate: Date.now() + 7 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Basketball'
        }
    })

    await events.createEvent({
        name: "Indiana Pacers x LA Clippers",
        ispremium: true,
        startingdate: Date.now() + 4 * 60 * 1000,
        finishingdate: Date.now() + 6 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Basketball'
        }
    })

    await events.createEvent({
        name: "Miami Heat x New York Knicks",
        ispremium: true,
        startingdate: Date.now(),
        finishingdate: Date.now() + 20 * 60 * 1000,
        state: 'Upcoming',
        sport: {
            name: 'Basketball'
        }
    })
    console.log("Creating event");

    console.log("Creating user");

    // Create user
    await axios.post(`${MS_USERS}/user/signup`, {
        username: "mbrito",
        password: "pass"
    })

    await axios.post(`${MS_USERS}/user/signup`, {
        username: "ldias",
        password: "pass"
    })

    // Create admin
    await axios.post(`${MS_USERS}/user/signup`, {
        username: "admin",
        password: "pass"
    })

    // Place bet
    await axios.post(`${MS_BETS}/bet/place`, {
        wager: 1,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 2
    })


    await basketballstats.create({
        homepoints: 1,
        awaypoints: 3,
        hometriples: 3,
        awaytriples: 7,
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

    setInterval(eventsTiming, 10000);

}

eventsTiming = async () => {
    console.log("Executing events timing!")
    await HandleEventsTiming.verify();
}



teste = async (eventOid) => {

    const updatedEvent = await availablebetypes.fetchByEventOid(eventOid);

    console.log("\n\n\n\n\n")
    updatedEvent.forEach(av => {
        console.log(av.dataValues)
    })
    console.log("\n\n\n\n\n");
}

// teste(1);
// teste(2);
// teste(3);
// teste(4);

setTimeout(seedData, 20000);


module.exports = app;
