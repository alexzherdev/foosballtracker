'use strict';

const Promise = require('bluebird');

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
        expect(overall.bestWinRate.name).toEqual('Pele');
        done();
      });
    });

    it('returns 2v2 stats', function(done) {
      Stats.getSummary().then(({ twovtwo }) => {
        expect(twovtwo.matchesPlayed).toEqual(4);
        expect(twovtwo.bestWinRate.rate).toEqual(1);
        expect(twovtwo.bestWinRate.name).toEqual('Pele & Ronaldo');
        done();
      });
    });

    it('returns 1v1 stats', function(done) {
      Stats.getSummary().then(({ onevone }) => {
        expect(onevone.matchesPlayed).toEqual(7);
        expect(onevone.bestWinRate.rate).toEqual(1);
        expect(onevone.bestWinRate.name).toEqual('Pele');
        done();
      });
    });
  });
});
