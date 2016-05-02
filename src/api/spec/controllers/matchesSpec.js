'use strict';


const request = require('supertest');
const Promise = require('bluebird');

require('../../models/player');
require('../../models/team');
const Players = require('../../models/players');
const Match = require('../../models/match');
const db = require('../../db');
const app = require('../../server');

const Player = db.model('Player');
const Team = db.model('Team');

const Matches = db.Collection.extend({ model: Match });

describe('Matches controller', () => {
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

  describe('index', () => {
    beforeEach((done) => {
      Match.forge({
        team1_id: team2P1.id, team2_id: team2P2.id,
        team1_score: 10, team2_score: 4
      }).save().then(done);
    });

    it('returns all matches', (done) => {
      request(app)
        .get('/matches')
        .end((err, res) => {
          let body = res.body;
          expect(body[0].id).toEqual(1);
          expect(body[0].team1_score).toEqual(10);
          expect(body[0].team2_score).toEqual(4);
          done();
        });
    });
  });

  describe('create', () => {
    it('creates a match', (done) => {
      request(app)
        .post('/matches')
        .send({ team1: [p1.id, p2.id], team2: [p3.id, p4.id], team1_score: 10, team2_score: 1 })
        .end((err, res) => {
          new Matches().fetch().then((matches) => {
            expect(matches.length).toEqual(1);
            expect(matches.at(0).get('match_type')).toEqual('2v2');
            done();
          });
        });
    });
  });
});
