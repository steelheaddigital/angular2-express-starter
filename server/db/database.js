var dbConfig = require('./knexfile')[process.env.NODE_ENV];

module.exports = require('knex')(dbConfig);
