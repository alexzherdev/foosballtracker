'use strict';


const config = require('../../knexfile.js');
const env    = process.env.NODE_ENV || 'development';
const knex   = require('knex')(config[env]);
knex.on('query', (query) => console.log(query));
module.exports = require('bookshelf')(knex);
