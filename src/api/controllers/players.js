'use strict';

let Player = require('../models/player');

let express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Player.all().then((players) => {
    res.send(players);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  Player.create(req.body.name).then((player) => {
    res.send(player);
  }).catch(next);
});

module.exports = router;
