"use strict";

const knex = require('../../db/database');

module.exports = function(gulp, basePath, callback){
  return knex.migrate.rollback({
    directory: basePath + 'db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("rolled back database to version: " + version);
    knex.destroy();
    process.exit();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
}