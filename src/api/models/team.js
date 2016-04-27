'use strict';


let db = require('../db');
let Player = require('./Player');

let Team = db.Model.extend({
  tableName: 'teams',
  hasTimestamps: true,

  players() {
    return this.belongsToMany(Player);
  }
}, {
  findOrCreateForPlayerIds(playerIds) {
    let q = this.query();
    return q.innerJoin('players_teams', 'teams.id', 'players_teams.team_id')
      .innerJoin('players', 'players_teams.player_id', 'players.id')
      .groupBy('teams.id')
      .having('ids', '=', playerIds.sort().join(','))
      .select(db.knex.raw('group_concat(players.id order by players.id asc) as ids'), 'teams.id')
      .then((result) => {
        if (result.length) {
          // there should only ever be a single team for any given set of players
          return new Team({ id: result[0].id }).fetch();
        } else {
          return Player.query('whereIn', 'id', playerIds).fetchAll().then((players) => {
            let team = new Team({
              name: players.pluck('name').sort().join(' & '),
              is_eigen_team: false
            });
            return team.save().then(() => {
              let id = team.id;
              return team.clear().set('id', id).fetch().then(() => team.players().attach(playerIds));
            });
          });
        }
      });
  }
});

module.exports = Team;
