import request from 'superagent';

import KSDispatcher from 'dispatcher';
import PlayerActions from 'playerActions';

import config from 'config';


let ApiClient = {
  baseUrl() {
    return `${config.host}:${config.port}`;
  },

  getPlayers() {
    return request.get(this.baseUrl() + '/players')
      .set('Accept', 'application/json')
      .end((err, res) => {
        PlayerActions.loadPlayersResponse(res);
      });
  }
};

export default ApiClient;

