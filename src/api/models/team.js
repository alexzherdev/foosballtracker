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
    return this.fetch({ withRelated: [{ players: (r) => r.count('* as count') }]});
  },

  fetchOpponents() {
    const id = this.id;
    return Team.query((qb) =>
      qb.leftOuterJoin('matches as m', function() {
        this.on(db.knex.raw('(m.team1_id = ? and teams.id = m.team2_id)', [id]))
          .orOn(db.knex.raw('(m.team2_id = ? and teams.id = m.team1_id)', [id]));
      })
        .select(db.knex.raw('IFNULL(IF(team1_id = ?, team2_id, team1_id), teams.id) as opp_id', [id]), 'teams.*')
        .countDistinct('m.id as played')
        .groupBy('opp_id')
        .orderBy('played', 'desc')
        .orderBy('teams.name')
    ).fetchAll({ withRelated: [{ players: (r) => r.groupBy('team_id').count('* as count') }]})
      .then((teams) => {
        const thisTeam = teams.remove({ id });
        return new db.Collection(teams.reject((t) => t.related('players').at(0).get('count') !== thisTeam.related('players').at(0).get('count')));
      });
  }
}, {
  fetchAll() {
    return this.forge().orderBy('id').fetchAll({ withRelated: [{ players: (r) => r.groupBy('team_id').count('* as count') }]});
  },

  findOrCreateForPlayerIds(playerIds) {
    return this.query().innerJoin('players_teams', 'teams.id', 'players_teams.team_id')
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
