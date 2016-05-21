'use strict';


if (process.env.NODE_ENV !== 'staging') {
  const secrets = require('./secrets');

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
    }
  };
} else {
  module.exports = {
    staging: {
      client: 'mysql',
      connection: process.env.DATABASE_URL,
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
}

