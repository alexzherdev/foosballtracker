'use strict';


const request = require('supertest');
const Promise = require('bluebird');

require('../../models/player');
const Players = require('../../models/players');
const db = require('../../db');
const app = require('../../server');

const Player = db.model('Player');
const setupMatches = require('../support/setupMatches');

describe('Stats controller', () => {
  beforeEach(function(done) {
    setupMatches.call(this).then(done);
  });

  describe('index', () => {
    it('returns detailed stats', (done) => {
      request(app)
        .get('/stats')
        .end((err, res) => {
          let body = res.body;
          expect(body.twovtwo).toBeDefined();
          expect(body.onevone).toBeDefined();
          done();
        });
    });
  });

  describe('summary', () => {
    it('returns stats summary', (done) => {
      request(app)
        .get('/stats/summary')
        .end((err, res) => {
          let body = res.body;
          expect(body.overall).toBeDefined();
          expect(body.twovtwo).toBeDefined();
          expect(body.onevone).toBeDefined();
          done();
        });
    });
  });
});
