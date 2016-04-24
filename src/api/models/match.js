'use strict';


const Promise = require('bluebird');
const _ = require('underscore');

const db = require('../db');
const Team = require('./team');

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
    return this.get('team1_score') === 10 ? this.team1() : this.team2();
  },

  ensureMatchType() {
    return Promise.map([this.team1(), this.team2()], (t) => {
      return t.fetch({ withRelated: 'players' });
    }).then((teams) => {
      let sizes = _.map(teams, (t) => t.related('players').length).sort();
      this.set('match_type', sizes.join('v'));
    });
  }
});

module.exports = Match;
