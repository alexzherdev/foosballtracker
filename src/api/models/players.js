'use strict';


const db = require('../db');
const Player = require('./player');

const Players = db.Collection.extend({
  model: Player
});

module.exports = Players;
