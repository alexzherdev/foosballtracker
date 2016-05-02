'use strict';


const Promise = require('bluebird');

const Player = require('../../models/player');
const Players = require('../../models/players');
const Teams = require('../../models/teams');


describe('Player', () => {
  describe('createWithEigenTeam', () => {
    it('creates both the player and the team', (done) => {
      Player.createWithEigenTeam({ name: 'Ferenc Puskas' })
        .then(() => Promise.all([new Players().fetchOne(), new Teams().fetchOne()]))
        .then(([p, t]) => {
          expect(p.get('name')).toEqual('Ferenc Puskas');
          expect(t.get('name')).toEqual('Ferenc Puskas');
          expect(t.get('is_eigen_team')).toEqual(1);
          done();
        });
    });
  });

  describe('getEigenTeam', () => {
    let player;

    beforeEach((done) => {
      Player.createWithEigenTeam({ name: 'Ferenc Puskas' }).then((p) => {
        player = p;
        done();
      });
    });

    it('gets the eigen-team', (done) => {
      Player.getEigenTeam(player.id).then((team) => {
        expect(team.get('name')).toEqual('Ferenc Puskas');
        expect(team.get('is_eigen_team')).toEqual(1);
        done();
      });
    });
  });
});
