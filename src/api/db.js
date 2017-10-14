'use strict';


const config = require('../../knexfile.js');
const env    = process.env.SERVER_ENV || 'development';
const knex   = require('knex')(config[env]);

if (env === 'development' || process.env.DEBUG) {
  knex.on('query', (query) => console.log(query));
}

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('pagination');

module.exports = bookshelf;
