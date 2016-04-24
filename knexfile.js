'use strict';

let secrets = require('./secrets');

module.exports = {
  development: {
    client: 'mysql',
    connection: Object.assign({
      database: 'foosball'
    }, secrets.development)
  },

  staging: {
    client: 'postgresql',
    connection: Object.assign({
      database: 'foosball'
    }, secrets.staging),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
