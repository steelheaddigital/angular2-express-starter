
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('role');
    table.string('password');
    table.string('provider');
    table.string('salt');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.json('facebook').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
