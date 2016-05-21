'use strict';


const request = require('supertest');

const app = require('../../server');

const setupMatches = require('../support/setupMatches');


describe('Teams controller', function() {
  describe('index', function() {
    beforeEach(function(done) {
      setupMatches.call(this).then(done);
    });

    it('returns all teams', function(done) {
      request(app)
        .get('/api/teams')
        .end((err, res) => {
          let body = res.body;
          expect(body.length).toEqual(11);
          expect(body[0].name).toBeDefined();
          expect(body[0].id).toBeDefined();
          done();
        });
    });
  });
});
