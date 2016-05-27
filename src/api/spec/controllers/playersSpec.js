'use strict';


const request = require('supertest');
const Promise = require('bluebird');

require('../../models/player');
const Players = require('../../models/players');
const db = require('../../db');
const app = require('../../server');

const Player = db.model('Player');

describe('Players controller', () => {
  describe('index', () => {
    beforeEach((done) => {
      Promise.map([{ name: 'Lev Yashin' }, { name: 'Valentin Ivanov' }], (attrs) => Player.createWithEigenTeam(attrs))
        .then(done);
    });

    it('returns all players', (done) => {
      request(app)
        .get('/api/players')
        .end((err, res) => {
          let body = res.body;
          expect(body[0].id).toEqual(1);
          expect(body[0].name).toEqual('Lev Yashin');
          expect(body[1].id).toEqual(2);
          expect(body[1].name).toEqual('Valentin Ivanov');
          done();
        });
    });
  });

  describe('create', () => {
    it('creates a player', (done) => {
      request(app)
        .post('/api/players')
        .send({ name: 'Lev Yashin' })
        .end(() => {
          new Players().fetch().then((players) => {
            expect(players.length).toEqual(1);
            expect(players.at(0).get('name')).toEqual('Lev Yashin');
            done();
          });
        });
    });
  });
});
