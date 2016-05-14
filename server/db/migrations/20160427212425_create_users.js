
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.timestamps();
    table.string('name');
    table.string('email');
    table.string('role');
    table.string('password');
    table.string('provider');
    table.string('salt')
    table.json('facebook').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
