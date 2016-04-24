exports.up = function(knex, Promise) {
  return knex.schema.table('teams', function(table) {
    table.boolean('is_eigen_team').notNullable(); // eigen-team is a 1-man team created for each player
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teams', function(table) {
    table.dropColumn('is_eigen_team');
  });
};
