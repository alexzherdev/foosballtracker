'use strict';


const Promise = require('bluebird');
const _ = require('lodash');

const db = require('../db');
const Team = require('./team');
const Player = require('./player');

const WIN_POINTS = 10;

const Match = db.Model.extend({
  tableName: 'matches',
  hasTimestamps: true,

  initialize() {
    this.on('saving', this.ensureMatchType);
  },

  team1() {
    return this.belongsTo(Team, 'team1_id');
  },

  team2() {
    return this.belongsTo(Team, 'team2_id');
  },

  getWinner() {
    return this.get('team1_score') === WIN_POINTS ? this.team1() : this.team2();
  },

  ensureMatchType() {
    return Promise.map([this.team1(), this.team2()], (t) => {
      return t.fetch({ withRelated: 'players' });
    }).then((teams) => {
      let sizes = _.map(teams, (t) => t.related('players').length).sort();
      this.set('match_type', sizes.join('v'));
    });
  }
}, {
  get winPoints() { return WIN_POINTS; },

  _queryWithTeams() {
    return this.query((qb) =>
      qb
        .innerJoin('teams as t1', function() {
          this.on('matches.team1_id', 't1.id');
        })
        .innerJoin('teams as t2', function() {
          this.on('matches.team2_id', 't2.id');
        })
        .orderBy('matches.id', 'desc')
        .select('matches.id', 'matches.created_at', 'matches.team1_score', 'matches.team2_score',
          'matches.team1_id', 'matches.team2_id', 'matches.match_type', 't1.name as team1_name', 't2.name as team2_name'));
  },

  fetchAllWithTeams() {
    return this._queryWithTeams().fetchAll();
  },

  fetchPage(page, pageSize) {
    return this._queryWithTeams().fetchPage({ page, pageSize });
  },

  createForTeams(team1Score, team2Score, team1Ids, team2Ids) {
    let team1, team2;
    if (team1Ids.length === 1) {
      team1 = Player.getEigenTeam(team1Ids[0]);
    } else {
      team1 = Team.findOrCreateForPlayerIds(team1Ids);
    }
    if (team2Ids.length === 1) {
      team2 = Player.getEigenTeam(team2Ids[0]);
    } else {
      team2 = Team.findOrCreateForPlayerIds(team2Ids);
    }

    return Promise.all([team1, team2]).then((teams) => {
      return this.forge({
        team1_id: teams[0].id, team2_id: teams[1].id,
        team1_score: team1Score, team2_score: team2Score
      }).save().then((match) => {
        return this._queryWithTeams().where('matches.id', match.id).fetch();
      });
    });
  },

  betweenTeams(team1Id, team2Id) {
    return this.query({ where: db.knex.raw('(team1_id = ? and team2_id = ?)', [team1Id, team2Id]),
      orWhere: db.knex.raw('(team1_id = ? and team2_id = ?)', [team2Id, team1Id]), orderBy: ['created_at', 'desc'] }).fetchAll();
  }
});

module.exports = Match;
