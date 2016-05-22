'use strict';

const Team = require('../models/team');

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Team.fetchAll().then((teams) => {
    let json = teams.toJSON({ omitPivot: true });
    for (let i = 0; i < json.length; i++) {
      json[i].players = json[i].players[0];
    }
    res.send(json);
  }).catch(next);
});


module.exports = router;
