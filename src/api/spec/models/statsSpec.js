'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const db = require('../../db');
require('../../models/player');
const Player = db.model('Player');
const Players = require('../../models/players');
const Stats = require('../../models/stats');

require('../../models/team');
const Team = db.model('Team');

const setupMatches = require('../support/setupMatches');


describe('Stats', function() {
  beforeEach(function(done) {
    setupMatches.call(this).then(done);
  });

  describe('getSummary', function() {
    it('returns overall stats', function(done) {
      Stats.getSummary().then(({ overall }) => {
        expect(overall.matchesPlayed).toEqual(11);
        expect(overall.bestWinRate.rate).toEqual(1);
        expect(overall.bestWinRate.name).toEqual(this.teamPele.get('name'));
        done();
      });
    });

    it('returns 2v2 stats', function(done) {
      Stats.getSummary().then(({ twovtwo }) => {
        expect(twovtwo.matchesPlayed).toEqual(4);
        expect(twovtwo.bestWinRate.rate).toEqual(1);
        expect(twovtwo.bestWinRate.name).toEqual(this.brazil.get('name'));
        done();
      });
    });

    it('returns 1v1 stats', function(done) {
      Stats.getSummary().then(({ onevone }) => {
        expect(onevone.matchesPlayed).toEqual(7);
        expect(onevone.bestWinRate.rate).toEqual(1);
        expect(onevone.bestWinRate.name).toEqual(this.teamPele.get('name'));
        done();
      });
    });
  });

  describe('getAll', function() {
    it('returns 2v2 stats', function(done) {
      Stats.getAll().then(({ twovtwo }) => {
        let france = _.find(twovtwo, { id: this.france.id });
        expect(france.goals_for).toEqual(13);
        expect(france.goals_against).toEqual(31);
        expect(france.goals_difference).toEqual(-18);
        expect(france.clean_sheets).toEqual(0);
        expect(france.failed_to_score).toEqual(1);

        let brazil = _.find(twovtwo, { id: this.brazil.id });
        expect(brazil.goals_for).toEqual(10);
        expect(brazil.goals_against).toEqual(0);
        expect(brazil.goals_difference).toEqual(10);
        expect(brazil.clean_sheets).toEqual(1);
        expect(brazil.failed_to_score).toEqual(0);
        done();
      });
    });

    it('returns 1v1 stats', function(done) {
      Stats.getAll().then(({ onevone }) => {
        let platini = _.find(onevone, { id: this.teamPlatini.id });
        expect(platini.goals_for).toEqual(20);
        expect(platini.goals_against).toEqual(5);
        expect(platini.goals_difference).toEqual(15);
        expect(platini.clean_sheets).toEqual(0);
        expect(platini.failed_to_score).toEqual(0);

        let maldini = _.find(onevone, { id: this.teamMaldini.id });
        expect(maldini.goals_for).toEqual(10);
        expect(maldini.goals_against).toEqual(10);
        expect(maldini.goals_difference).toEqual(0);
        expect(maldini.clean_sheets).toEqual(1);
        expect(maldini.failed_to_score).toEqual(1);
        done();
      });
    });
  });
});
