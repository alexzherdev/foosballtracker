import request from 'superagent';

import KSDispatcher from 'dispatcher';
import PlayerActions from 'playerActions';

import config from 'config';


let ApiClient = {
  baseUrl() {
    return `${config.host}:${config.apiPort}`;
  },

  createPlayer(name) {
    request.post(this.baseUrl() + '/players')
      .send({ name })
      .end((err, res) => {
        PlayerActions.createPlayerResponse(res);
      });
  },

  getPlayers() {
    request.get(this.baseUrl() + '/players')
      .end((err, res) => {
        PlayerActions.loadPlayersResponse(res);
      });
  }
};

export default ApiClient;
