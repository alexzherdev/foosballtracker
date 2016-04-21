module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'foosball',
      user:     'root',
      password: ''
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'foosball',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
