'use strict';

let secrets = require('./secrets');

module.exports = {
  development: {
    client: 'mysql',
    connection: Object.assign({
      database: 'foosball',
      timezone: 'UTC'
    }, secrets.development)
  },

  test: {
    client: 'mysql',
    connection: Object.assign({
      database: 'foosball_test',
      timezone: 'UTC'
    }, secrets.test)
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
