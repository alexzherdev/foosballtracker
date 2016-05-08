'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('../../config');
const players = require('./controllers/players');
const matches = require('./controllers/matches');
const stats = require('./controllers/stats');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/players', players);
app.use('/matches', matches);
app.use('/stats', stats);

app.listen(config.apiPort, () => {
  console.log(`Listening on port ${config.apiPort}`);
});

module.exports = app;
