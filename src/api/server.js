'use strict';


let express = require('express');
let cors = require('cors');

let config = require('../../config');
let players = require('./controllers/players');


let app = express();
app.use(cors());
app.use('/players', players);

app.listen(config.apiPort, () => {
  console.log(`Listening on port ${config.apiPort}`);
});
