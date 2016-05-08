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
        let id = match.id;
        return match.clear().set('id', id).fetch();
      });
    });
  }
});

module.exports = Match;
