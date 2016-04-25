exports.up = function(knex, Promise) {
  return knex.schema.createTable('players_teams', function(table) {
    table.increments();
    table.integer('player_id').unsigned().notNullable().references('players.id');
    table.integer('team_id').unsigned().notNullable().references('teams.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players_teams');
};
