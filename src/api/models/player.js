'use strict';


let moment = require('moment');

let knex = require('../db');

let Player = {
  all() {
    return knex.select('*').from('players');
  },

  create(name) {
    let m = moment();
    let date = m.subtract(m.utcOffset(), 'minutes').toDate();
    return knex.insert({ name, created_at: date, updated_at: date }).into('players').then((ids) => {
      return knex.first('*').from('players').where({ id: ids[0] });
    });
  }
};

module.exports = Player;
