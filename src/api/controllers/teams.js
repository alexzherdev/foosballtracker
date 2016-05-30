'use strict';

const Team = require('../models/team');

const express = require('express'),
  router = express.Router();

const flattenPlayers = (collection) => {
  const json = collection.toJSON({ omitPivot: true });
  json.forEach((j) => {
    j.players = j.players[0];
  });
  return json;
};

router.get('/', (req, res, next) => {
  Team.fetchAll().then((teams) => {
    res.send(flattenPlayers(teams));
  }).catch(next);
});

router.get('/:teamId/opponents', (req, res, next) => {
  Team.forge({ id: req.params.teamId }).fetchOpponents().then((teams) => {
    res.send(flattenPlayers(teams));
  }).catch(next);
});

module.exports = router;
