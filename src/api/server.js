'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const config = require('../../config');
const players = require('./controllers/players');
const matches = require('./controllers/matches');
const stats = require('./controllers/stats');
const teams = require('./controllers/teams');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/players', players);
app.use('/api/matches', matches);
app.use('/api/stats', stats);
app.use('/api/teams', teams);

app.use(express.static(__dirname + '/../../dist'));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = app;
