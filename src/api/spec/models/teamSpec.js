'use strict';

const Promise = require('bluebird');

const Player = require('../../models/player');
const Team = require('../../models/team');

const setupMatches = require('../support/setupMatches');


describe('Team', () => {
  describe('findOrCreateForPlayerIds', () => {
    describe('for a single player', () => {
      let player;

      beforeEach((done) => {
        Player.forge({ name: 'Bobby Charlton' }).save().then((p) => {
          player = p;
          done();
        });
      });

      it('creates a new team when there isn\'t one', (done) => {
        Team.findOrCreateForPlayerIds([player.id])
          .then((team) => team.fetch({ withRelated: ['players'] }))
          .then((team) => {
            expect(team.related('players').pluck('id')).toEqual([player.id]);
            expect(team.get('is_eigen_team')).toBe(1);
            done();
          });
      });

      it('returns the existing team if there is one', (done) => {
        Team.findOrCreateForPlayerIds([player.id])
          .then((team) => {
            Team.findOrCreateForPlayerIds([player.id]).then((team2) => {
              expect(team.id).toEqual(team2.id);
              expect(team.get('is_eigen_team')).toBe(1);
              done();
            });
          });
      });
    });

    describe('for multiple players', () => {
      let players;

      beforeEach((done) => {
        Promise.map([{ name: 'Bobby Charlton' }, { name: 'Kevin Keegan' }],
          (attrs) => Player.forge(attrs).save()).then((ps) => {
            players = ps;
            done();
          });
      });

      it('creates a new team when there isn\'t one', (done) => {
        Team.findOrCreateForPlayerIds(players.map((p) => p.id))
          .then((team) => team.fetch({ withRelated: ['players'] }))
          .then((team) => {
            expect(team.related('players').pluck('id').sort()).toEqual(players.map((p) => p.id).sort());
            expect(team.get('is_eigen_team')).toBe(0);
            done();
          });
      });

      it('returns the existing team if there is one', (done) => {
        Team.findOrCreateForPlayerIds(players.map((p) => p.id))
          .then((team) => {
            Team.findOrCreateForPlayerIds(players.map((p) => p.id)).then((team2) => {
              expect(team.id).toEqual(team2.id);
              expect(team.get('is_eigen_team')).toBe(0);
              done();
            });
          });
      });
    });
  });

  describe('fetchOpponents', function() {
    beforeEach(function(done) {
      setupMatches.call(this).then(done);
    });

    const verifyOpponents = (opps, length, expectedOpps) => {
      const json = opps.toJSON();
      expect(json.length).toEqual(length);
      for (let i = 0; i < expectedOpps.length; i++) {
        expect(json[i]).toEqual(jasmine.objectContaining(expectedOpps[i]));
      }
    };

    it('fetches opponents for 1v1', function(done) {
      this.teamBuffon.fetchOpponents().then((opps) => {
        verifyOpponents(opps, 8, [
          { name: 'Paolo Maldini', played: 2 },
          { name: 'Pele', played: 1 },
          { name: 'Franz Beckenbauer', played: 0 }
        ]);
        done();
      });
    });

    it('fetches opponents for 2v2', function(done) {
      this.france.fetchOpponents().then((opps) => {
        verifyOpponents(opps, 3, [
          { name: 'Gianluigi Buffon & Paolo Maldini', played: 3 },
          { name: 'Pele & Ronaldo', played: 1 },
          { name: 'Franz Beckenbauer & Oliver Kahn', played: 0 }
        ]);
        done();
      });
    });

    it('fetches opponents for a player without 1v1 matches', function(done) {
      this.teamKahn.fetchOpponents().then((opps) => {
        verifyOpponents(opps, 8, [{ name: 'Franz Beckenbauer', played: 0 }]);
        done();
      });
    });
  });
});
