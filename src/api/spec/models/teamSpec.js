'use strict';

const Promise = require('bluebird');

const Player = require('../../models/player');
const Team = require('../../models/team');


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
});
