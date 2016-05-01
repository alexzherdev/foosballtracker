exports.up = function(knex, Promise) {
  var teams = knex.schema.createTableIfNotExists('teams', function(table) {
    table.increments();
    table.string('name');
    table.timestamps();
  });
  var matches = knex.schema.createTableIfNotExists('matches', function(table) {
    table.increments();
    table.integer('team1_id');
    table.integer('team2_id');
    table.integer('team1_score');
    table.integer('team2_score');
    table.string('match_type'); // 1v1, 1v2, 2v2
    table.timestamps();
  });

  return Promise.all([teams, matches]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('matches'),
    knex.schema.dropTable('teams')
  ]);;
};
