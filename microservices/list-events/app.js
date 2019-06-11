const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const axios = require('axios');

const eventRouter = require('./routes/event');
const availableBetTypesRouter = require('./routes/availablebettypes');
const app = express();
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

module.exports = app;
