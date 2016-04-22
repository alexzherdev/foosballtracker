'use strict';

let Player = require('../models/player');

let express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Player.all().then((players) => {
    res.send(players);
  }).catch(next);
});

module.exports = router;