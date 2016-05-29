'use strict';

const Match = require('../models/match');

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  let fetch;
  const { page, page_size } = req.query;

  if (page) {
    fetch = Match.fetchPage(page, page_size);
  } else {
    fetch = Match.fetchAllWithTeams();
  }
  fetch.then((matches) => {
    res.send({ items: matches.toJSON(), pagination: matches.pagination });
  }).catch(next);
});

router.get('/h2h', (req, res, next) => {
  Match.betweenTeams(req.query.team1_id, req.query.team2_id).then((matches) => {
    res.send(matches);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  const body = req.body;
  Match.createForTeams(
    body.team1_score, body.team2_score,
    body.team1, body.team2
  ).then((match) => {
    res.send(match);
  }).catch(next);
});

module.exports = router;
