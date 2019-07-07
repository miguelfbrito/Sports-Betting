const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const BetType = require('./controllers/bettype');
const Bet = require('./controllers/bet');

const betRouter = require('./routes/bets');
const betTypeRouter = require('./routes/bettype');

const app = express();

require('dotenv').config();

app.use(cors())
app.options('*', cors())

global.MS_EVENTS = process.env.MS_EVENTS || ''
global.MS_USERS = process.env.MS_USERS || ''

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bet', betRouter);
app.use('/bettype', betTypeRouter);

testFunction = async () => {

    await BetType.seed()

    await Bet.create(
        {
            wager: 1.25,
            userOid: 1,
            eventOid: 1,
            bettypeOid: 1
        }
    )
    await Bet.create({
        wager: 4.25,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 2

    })
    await Bet.create({
        wager: 1.25,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 3

    })
    await Bet.create({
        wager: 1.55,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 4

    })
    await Bet.create({
        wager: 3.25,
        userOid: 1,
        eventOid: 2,
        bettypeOid: 5

    })
    await Bet.create({
        wager: 2.25,
        userOid: 1,
        eventOid: 2,
        bettypeOid: 3

    })
}

setTimeout(testFunction, 1000);


module.exports = app;
