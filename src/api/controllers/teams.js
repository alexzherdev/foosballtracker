'use strict';

const Team = require('../models/team');

const express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  Team.fetchAll().then((teams) => {
    res.send(teams);
  }).catch(next);
});


module.exports = router;
