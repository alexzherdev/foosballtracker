'use strict';


const request = require('supertest');

const Match = require('../../models/match');

const app = require('../../server');

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
          let items = res.body.items;
          expect(items.length).toEqual(12);
          expect(items[0].id).toBeDefined();
          expect(items[0].team1_id).toBeDefined();
          expect(items[0].team1_score).toBeDefined();
          expect(items[0].team2_id).toBeDefined();
          expect(items[0].team2_score).toBeDefined();
          done();
        });
    });

    it('returns a page of matches', (done) => {
      request(app)
        .get('/api/matches')
        .query({ page: 3, page_size: 4 })
        .end((err, res) => {
          let body = res.body;
          expect(body.items.length).toEqual(4);
          expect(body.pagination).toEqual({ page: 3, pageSize: 4, rowCount: 12, pageCount: 3 });
          done();
        });
    });
  });

  describe('create', function() {
    it('creates a match', function(done) {
      request(app)
        .post('/api/matches')
        .send({ team1: [this.zidane.id, this.platini.id], team2: [this.pele.id, this.ronaldo.id], team1_score: 10, team2_score: 1 })
        .end(() => {
          Match.forge().orderBy('id', 'desc').fetchAll().then((matches) => {
            let json = matches.toJSON();
            expect(json.length).toEqual(13);
            expect(json[0].match_type).toEqual('2v2');
            expect(json[0].team1_score).toEqual(10);
            expect(json[0].team2_score).toEqual(1);
            done();
          });
        });
    });
  });

  describe('delete', function() {
    it('deletes a match', function(done) {
      request(app)
        .delete('/api/matches/1')
        .end(() => {
          Match.forge().orderBy('id', 'desc').fetchAll().then((matches) => {
            let json = matches.toJSON();
            expect(json.length).toEqual(11);
            const score = json.find((s) => s.id === 1);
            expect(score).toBeUndefined();
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
