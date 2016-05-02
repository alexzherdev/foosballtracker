'use strict';


const Promise = require('bluebird');

const db = require('../../db');
const Match = require('../../models/match');
require('../../models/player');
require('../../models/team');

const Team = db.model('Team');

describe('Match', () => {
  describe('createForTeams', () => {
    let team1P1, team1P2, team2P1, team2P2,
      p1, p2, p3, p4;
    beforeEach((done) => {
      Promise.map([{ name: 'Roberto Carlos' }, { name: 'Dunga' }, { name: 'Zinedine Zidane' }, { name: 'Laurent Blanc' }], (attrs) => {
        return db.model('Player').createWithEigenTeam(attrs);
      }).then((players) => { p1 = players[0]; p2 = players[1]; p3 = players[2]; p4 = players[3]; }).then(() => Promise.all([
        Promise.map([p1, p2], (p) => p.eigenTeam()).then((teams) => {
          [team1P1, team1P2] = teams;
        }),
        Promise.all([Team.findOrCreateForPlayerIds([p1.id, p2.id]), Team.findOrCreateForPlayerIds([p3.id, p4.id])]).then((teams) => {
          [team2P1, team2P2] = teams;
        })
      ])).then(done);
    });

    it('is created correctly for 1v1', (done) => {
      Match.createForTeams(10, 3, [p1.id], [p2.id]).then((match) => {
        expect(match.get('match_type')).toEqual('1v1');
        expect(match.get('team1_id')).toEqual(team1P1.id);
        expect(match.get('team2_id')).toEqual(team1P2.id);
        match.getWinner().fetch().then((winner) => {
          expect(winner.id).toEqual(team1P1.id);
          done();
        });
      });
    });

    it('is created correctly for 1v2', (done) => {
      Match.createForTeams(10, 3, [p1.id], [p3.id, p4.id]).then((match) => {
        expect(match.get('match_type')).toEqual('1v2');
        expect(match.get('team1_id')).toEqual(team1P1.id);
        expect(match.get('team2_id')).toEqual(team2P2.id);
        match.getWinner().fetch().then((winner) => {
          expect(winner.id).toEqual(team1P1.id);
          done();
        });
      });
    });

    it('is created correctly for 2v1', (done) => {
      Match.createForTeams(10, 3, [p3.id, p4.id], [p1.id]).then((match) => {
        expect(match.get('match_type')).toEqual('1v2');
        expect(match.get('team1_id')).toEqual(team2P2.id);
        expect(match.get('team2_id')).toEqual(team1P1.id);
        match.getWinner().fetch().then((winner) => {
          expect(winner.id).toEqual(team2P2.id);
          done();
        });
      });
    });

    it('is created correctly for 2v2', (done) => {
      Match.createForTeams(10, 3, [p3.id, p4.id], [p1.id, p2.id]).then((match) => {
        expect(match.get('match_type')).toEqual('2v2');
        expect(match.get('team1_id')).toEqual(team2P2.id);
        expect(match.get('team2_id')).toEqual(team2P1.id);
        match.getWinner().fetch().then((winner) => {
          expect(winner.id).toEqual(team2P2.id);
          done();
        });
      });
    });
  });
});
