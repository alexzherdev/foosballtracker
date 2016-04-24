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
  Match.forge(req.body).save().then((match) => {
    res.send(match);
  }).catch(next);
});

module.exports = router;
