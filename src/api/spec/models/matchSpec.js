'use strict';


const Match = require('../../models/match');

const setupMatches = require('../support/setupMatches');

describe('Match', function() {
  beforeEach(function(done) {
    setupMatches.call(this).then(done);
  });

  const verifyMatch = function(match, matchType, team1, team2, winner, done) {
    expect(match.get('match_type')).toEqual(matchType);
    expect(match.get('team1_id')).toEqual(team1.id);
    expect(match.get('team2_id')).toEqual(team2.id);
    match.getWinner().fetch().then((w) => {
      expect(w.id).toEqual(winner.id);
      done();
    });
  };

  describe('createForTeams', function() {
    it('is created correctly for 1v1', function(done) {
      Match.createForTeams(10, 3, [this.zidane.id], [this.platini.id]).then((match) => {
        verifyMatch.call(this, match, '1v1', this.teamZidane, this.teamPlatini, this.teamZidane, done);
      });
    });

    it('is created correctly for 1v2', function(done) {
      Match.createForTeams(10, 3, [this.zidane.id], [this.pele.id, this.ronaldo.id]).then((match) => {
        verifyMatch.call(this, match, '1v2', this.teamZidane, this.brazil, this.teamZidane, done);
      });
    });

    it('is created correctly for 2v1', function(done) {
      Match.createForTeams(10, 3, [this.pele.id, this.ronaldo.id], [this.zidane.id]).then((match) => {
        verifyMatch.call(this, match, '1v2', this.brazil, this.teamZidane, this.brazil, done);
      });
    });

    it('is created correctly for 2v2', function(done) {
      Match.createForTeams(10, 3, [this.zidane.id, this.platini.id], [this.pele.id, this.ronaldo.id]).then((match) => {
        verifyMatch.call(this, match, '2v2', this.france, this.brazil, this.france, done);
      });
    });
  });
});
