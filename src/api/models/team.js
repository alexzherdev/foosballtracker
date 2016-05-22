'use strict';


const db = require('../db');

require('./player');


const Team = db.Model.extend({
  tableName: 'teams',
  hasTimestamps: true,

  players() {
    return this.belongsToMany('Player');
  },

  fetchWithPlayerCount() {
    return this.fetch({ withRelated: [{ players: function(r) { r.count('* as count'); }}]});
  }
}, {
  fetchAll() {
    return this.forge().orderBy('id').fetchAll({ withRelated: [{ players: function(r) { r.groupBy('team_id').count('* as count'); }}]});
  },

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
          return db.model('Player').query('whereIn', 'id', playerIds).fetchAll().then((players) => {
            let team = new Team({
              name: players.pluck('name').sort().join(' & '),
              is_eigen_team: players.length === 1 ? true : false
            });
            return team.save().then(() => {
              let id = team.id;
              return team.clear().set('id', id).fetch({ withRelated: ['players'] }).tap((t) => {
                return t.players().attach(playerIds);
              });
            });
          });
        }
      });
  }
});

module.exports = db.model('Team', Team);
