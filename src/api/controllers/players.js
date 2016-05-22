'use strict';

const Player = require('../models/player');

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Player.forge().orderBy('id').fetchAll().then((players) => {
    res.send(players);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  Player.createWithEigenTeam({ name: req.body.name }).then((player) => {
    res.send(player);
  }).catch(next);
});

module.exports = router;
