'use strict';


let knex = require('../db');

let Player = {
  all() {
    return knex.select('*').from('players');
  }
};

module.exports = Player;