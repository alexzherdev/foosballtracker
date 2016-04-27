'use strict';

const Match = require('../models/match');

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Match.fetchAll().then((matches) => {
    res.send(matches);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  let body = req.body;
  Match.createForTeams(
    body.team1_score, body.team2_score,
    body.team1, body.team2
  ).then((match) => {
    res.send(match);
  }).catch(next);
});

module.exports = router;
