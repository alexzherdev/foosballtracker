'use strict';


let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let config = require('../../config');
let players = require('./controllers/players');


let app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/players', players);


app.listen(config.apiPort, () => {
  console.log(`Listening on port ${config.apiPort}`);
});
