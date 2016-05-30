'use strict';

const Promise = require('bluebird');

const db = require('../../db');
require('../../models/player');
require('../../models/team');
const Player = db.model('Player');
const Team = db.model('Team');
const Match = require('../../models/match');

/*

1v1:

Platini W - L Zidane
Buffon  W - L Maldini
Buffon  L - W Maldini
Pele    W - L Buffon
Pele    W - L Beckenbauer
Pele    W - L Ronaldo
Platini W - L Beckenbauer

(no matches for Kahn)

2v2:

France  W - L Italy
France  L - W Italy
Brazil  W - L France
Italy   W - L France
Germany W - L Brazil

*/


module.exports = function() {
  return Promise.map([{ name: 'Michel Platini' }, { name: 'Zinedine Zidane' }, { name: 'Gianluigi Buffon' }, { name: 'Paolo Maldini' },
    { name: 'Pele' }, { name: 'Ronaldo' }, { name: 'Franz Beckenbauer'}, { name: 'Oliver Kahn' }, { name: 'No Matches'}], (attrs) => {
    return Player.createWithEigenTeam(attrs);
  }).then((players) => {
    ['platini', 'zidane', 'buffon', 'maldini', 'pele', 'ronaldo', 'beckenbauer', 'kahn', 'noMatches'].forEach((name, i) => {
      this[name] = players[i];
    });
  }).then(() => Promise.all([
    Promise.map([this.platini, this.zidane, this.buffon, this.maldini, this.pele, this.ronaldo, this.beckenbauer, this.kahn],
      (p) => p.eigenTeam()).then((teams) => {
        [this.teamPlatini, this.teamZidane, this.teamBuffon, this.teamMaldini, this.teamPele, this.teamRonaldo, this.teamBeckenbauer, this.teamKahn] = teams; }),
    Promise.all([
      Team.findOrCreateForPlayerIds([this.platini.id, this.zidane.id]),
      Team.findOrCreateForPlayerIds([this.buffon.id, this.maldini.id]),
      Team.findOrCreateForPlayerIds([this.pele.id, this.ronaldo.id]),
      Team.findOrCreateForPlayerIds([this.kahn.id, this.beckenbauer.id])
    ]).then((teams) => {
      [this.france, this.italy, this.brazil, this.germany] = teams;
    }).then(() => Promise.map([
        [10, 4, [this.platini.id], [this.zidane.id]],
        [10, 0, [this.buffon.id], [this.maldini.id]],
        [0, 10, [this.buffon.id], [this.maldini.id]],
        [10, 9, [this.pele.id], [this.buffon.id]],
        [10, 5, [this.pele.id], [this.beckenbauer.id]],
        [10, 0, [this.pele.id], [this.ronaldo.id]],
        [10, 1, [this.platini.id], [this.beckenbauer.id]],

        [10, 1, [this.platini.id, this.zidane.id], [this.buffon.id, this.maldini.id]],
        [2, 10, [this.platini.id, this.zidane.id], [this.buffon.id, this.maldini.id]],
        [10, 0, [this.pele.id, this.ronaldo.id], [this.platini.id, this.zidane.id]],
        [10, 1, [this.buffon.id, this.maldini.id], [this.platini.id, this.zidane.id]],
        [5, 10, [this.pele.id, this.ronaldo.id], [this.kahn.id, this.beckenbauer.id]]
      ], (args) => Match.createForTeams(...args))
    )
  ]));
};

