'use strict';

import Stats from '../models/stats';

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Stats.getAll().then((stats) => {
    res.send(stats);
  }).catch(next);
});

router.get('/summary', (req, res, next) => {
  Stats.getSummary().then((stats) => {
    res.send(stats);
  }).catch(next);
});

router.get('/players', (req, res, next) => {
  Stats.getPlayersStats().then((stats) => {
    res.send(stats);
  }).catch(next);
});

router.get('/:teamId', (req, res, next) => {
  Stats.getForTeam(+req.params.teamId).then((stats) => {
    res.send(stats);
  }).catch(next);
});

module.exports = router;
