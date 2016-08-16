"use strict";

const knex = require('../../db/database');

module.exports = function(gulp, basePath, callback){
  return knex.migrate.latest({
    directory: basePath + 'db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("updated database to version: " + version);
    knex.destroy();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
}