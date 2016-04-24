import request from 'superagent';
import toastr from 'toastr';

import FTDispatcher from './dispatchers/dispatcher';
import PlayerActions from './actions/playerActions';

import config from '../../config';


toastr.options.closeButton = true;

let notification = (style, text) => {
  toastr[style](text);
};

let handleResponse = (err, res, callback) => {
  if (res && !res.ok) {
    notification('error', `Server error: ${res.text}`);
  } else if (err) {
    notification('error', 'Request error. Check your network settings.');
  } else {
    callback(err, res);
  }
};

let ApiClient = {
  baseUrl() {
    return `${config.host}:${config.apiPort}`;
  },

  createPlayer(name) {
    request.post(this.baseUrl() + '/players')
      .send({ name })
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          PlayerActions.createPlayerResponse(res);
        });
      });
  },

  getPlayers() {
    request.get(this.baseUrl() + '/players')
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          PlayerActions.loadPlayersResponse(res);
        });
      });
  }
};

export default ApiClient;
