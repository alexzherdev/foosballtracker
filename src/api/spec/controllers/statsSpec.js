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
        .get('/api/stats')
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
        .get('/api/stats/summary')
        .end((err, res) => {
          let body = res.body;
          expect(body.overall).toBeDefined();
          expect(body.twovtwo).toBeDefined();
          expect(body.onevone).toBeDefined();
          done();
        });
    });
  });

  describe('team', function() {
    it('returns team stats', function(done) {
      request(app)
        .get(`/api/stats/${this.france.id}`)
        .end((err, res) => {
          let body = res.body;
          expect(body.team).toBeDefined();
          expect(body.scores).toBeDefined();
          expect(body.stats).toBeDefined();
          done();
        });
    });
  });

  describe('players', function() {
    it('returns players stats', function(done) {
      request(app)
        .get('/api/stats/players')
        .end((err, res) => {
          let body = res.body;
          expect(body[0]).toBeDefined();
          expect(body[0].id).toBeDefined();
          expect(body[0].played).toBeDefined();
          done();
        });
    });
  });
});
