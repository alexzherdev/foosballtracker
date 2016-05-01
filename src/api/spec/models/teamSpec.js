'use strict';


const Team = require('../../models/team');

describe('foo', () => {
  it('bar', (done) => {
    let t = new Team({ name: 'foo', is_eigen_team: true });
    t.save().then(() => {
      done();
    });
  });
});
