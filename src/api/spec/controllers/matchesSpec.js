'use strict';


const request = require('supertest');
const Promise = require('bluebird');
const _ = require('lodash');

require('../../models/player');
require('../../models/team');
const Players = require('../../models/players');
const Match = require('../../models/match');
const db = require('../../db');
const app = require('../../server');

const Player = db.model('Player');
const Team = db.model('Team');

const setupMatches = require('../support/setupMatches');

describe('Matches controller', function() {
  beforeEach(function(done) {
    setupMatches.call(this).then(done);
  });

  describe('index', () => {
    it('returns all matches', (done) => {
      request(app)
        .get('/api/matches')
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(11);
          expect(body[0].id).toBeDefined();
          expect(body[0].team1_id).toBeDefined();
          expect(body[0].team1_score).toBeDefined();
          expect(body[0].team2_id).toBeDefined();
          expect(body[0].team2_score).toBeDefined();
          done();
        });
    });
  });

  describe('create', function() {
    it('creates a match', function(done) {
      request(app)
        .post('/api/matches')
        .send({ team1: [this.zidane.id, this.platini.id], team2: [this.pele.id, this.ronaldo.id], team1_score: 10, team2_score: 1 })
        .end((err, res) => {
          Match.forge().orderBy('id', 'desc').fetchAll().then((matches) => {
            let json = matches.toJSON();
            expect(json.length).toEqual(12);
            expect(json[0].match_type).toEqual('2v2');
            expect(json[0].team1_score).toEqual(10);
            expect(json[0].team2_score).toEqual(1);
            done();
          });
        });
    });
  });

  describe('h2h', function() {
    it('returns matches between two teams', function(done) {
      request(app)
        .get('/api/matches/h2h')
        .query({ team1_id: this.italy.id, team2_id: this.france.id })
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(3);
          body.forEach((b) => {
            expect([this.italy.id, this.france.id]).toContain(b.team1_id);
            expect([this.italy.id, this.france.id]).toContain(b.team2_id);
          });
          done();
        });
    });
  });
});
