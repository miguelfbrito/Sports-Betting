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

    const bet = {
        wager: 3.33,
        userOid: 1,
        eventOid: 1,
        bettypeOid: 1
    }

    await Bet.create(bet)
}

setTimeout(testFunction, 1000);


module.exports = app;
