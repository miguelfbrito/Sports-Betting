const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const constants = require('./common/constants');
const Bet = require('./controllers/bet');

const betsRouter = require('./routes/bets');

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bets', betsRouter);

testFunction = async () => {

    const bet = {
        wager: 3.33,
        userOid: 3,
        eventOid: 1
    }
    const data = await Bet.create(bet)

    console.log(data)


    console.log(constants.host)
}

testFunction();


module.exports = app;
