'use strict';


const db = require('../db');
require('./team');

const Player = db.Model.extend({
  tableName: 'players',
  hasTimestamps: true,

  teams() {
    return this.belongsToMany('Team');
  },

  eigenTeam() {
    return this.teams().query({ where: { is_eigen_team: true } }).fetchOne();
  }
}, {
  createWithEigenTeam(attributes) {
    return db.transaction((transacting) => {
      return this.forge(attributes).save(null, { transacting }).tap((player) => {
        return player.teams().create({ name: player.get('name'), is_eigen_team: true }, { transacting });
      });
    });
  },

  getEigenTeam(playerId) {
    return this.where({ id: playerId }).fetch().then((player) => {
      return player.eigenTeam();
    });
  }
});

module.exports = db.model('Player', Player);
