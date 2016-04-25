'use strict';


let db = require('../db');
let Player = require('./Player');

let Team = db.Model.extend({
  tableName: 'teams',
  hasTimestamps: true,

  players() {
    return this.belongsToMany(Player);
  }
});

module.exports = Team;
