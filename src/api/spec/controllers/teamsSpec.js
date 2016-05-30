'use strict';


const request = require('supertest');

const app = require('../../server');

const setupMatches = require('../support/setupMatches');


describe('Teams controller', function() {
  beforeEach(function(done) {
    setupMatches.call(this).then(done);
  });

  describe('index', function() {
    it('returns all teams', function(done) {
      request(app)
        .get('/api/teams')
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(13);
          expect(body[0].name).toBeDefined();
          expect(body[0].id).toBeDefined();
          done();
        });
    });
  });

  describe('opponents', function() {
    it('returns opponents for 1v1', function(done) {
      request(app)
        .get(`/api/teams/${this.teamZidane.id}/opponents`)
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(8);
          expect(body[0].name).toBeDefined();
          expect(body[0].id).toBeDefined();
          expect(body[0].played).toBeDefined();
          done();
        });
    });

    it('returns opponents for 2v2', function(done) {
      request(app)
        .get(`/api/teams/${this.france.id}/opponents`)
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(3);
          expect(body[0].name).toBeDefined();
          expect(body[0].id).toBeDefined();
          expect(body[0].played).toBeDefined();
          done();
        });
    });
  });
});
