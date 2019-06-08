const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const BetType = require('./controllers/bettype');
const Bet = require('./controllers/bet');

const betRouter = require('./routes/bets');
const betTypeRouter = require('./routes/bettype');

const app = express();

require('dotenv').config();

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

    const bet = {
        wager: 3.33,
        userOid: 3,
        eventOid: 1
    }

    await Bet.create(bet)
    BetType.seed()
}

testFunction();


module.exports = app;
