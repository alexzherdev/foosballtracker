'use strict';


let db = require('../db');

let Player = db.Model.extend({
  tableName: 'players',
  hasTimestamps: true
});

module.exports = Player;
