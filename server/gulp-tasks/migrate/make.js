"use strict";

const knex = require('../../db/database');

module.exports = function(gulp, basePath, callback){
  return knex.migrate.make(args.name, {
    directory: basePath + 'db/migrations'
  })
  .then(function (version) {
    console.log("created migration");
    knex.destroy();
    process.exit();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
}