'use strict';


const db = require('../db');
require('./team');

const Teams = db.Collection.extend({
  model: db.model('Team')
});

module.exports = Teams;
