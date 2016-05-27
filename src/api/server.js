'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path')
const auth = require('http-auth');

const config = require('../../config');
const players = require('./controllers/players');
const matches = require('./controllers/matches');
const stats = require('./controllers/stats');
const teams = require('./controllers/teams');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use('/api/players', players);
app.use('/api/matches', matches);
app.use('/api/stats', stats);
app.use('/api/teams', teams);
app.use(express.static(`${__dirname}/../../${config.assetsDir}`));

if (process.env.NODE_ENV === 'production') {
  const basic = auth.basic({
    realm: "Protected Area"
  }, (username, password, callback) => {
    callback(username === process.env.HTTP_USER && password === process.env.HTTP_PASSWORD);
  });

  app.use(auth.connect(basic));
}

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../../${config.assetsDir}/index.html`));
});
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = app;
