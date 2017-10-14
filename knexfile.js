'use strict';


if (process.env.SERVER_ENV === 'production') {
  module.exports = {
    production: {
      client: 'mysql',
      connection: process.env.DATABASE_URL,
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
} else if (process.env.SERVER_ENV === 'sandbox') {
  module.exports = {
    sandbox: {
      client: 'mysql',
      connection: process.env.DATABASE_URL,
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
} else {
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
}
