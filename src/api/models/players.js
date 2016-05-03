'use strict';


const db = require('../db');
require('./player');
const Player = db.model('Player');

const Players = db.Collection.extend({
  model: Player
});

module.exports = Players;
