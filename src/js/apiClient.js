import request from 'superagent';
import toastr from 'toastr';

import FTDispatcher from './dispatchers/dispatcher';
import PlayerActions from './actions/playerActions';
import ScoreActions from './actions/scoreActions';
import StatsActions from './actions/statsActions';

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
    request.post(`${this.baseUrl()}/players`)
      .send({ name })
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          PlayerActions.createPlayerResponse(res);
        });
      });
  },

  getPlayers() {
    request.get(`${this.baseUrl()}/players`)
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          PlayerActions.loadPlayersResponse(res);
        });
      });
  },

  getScores() {
    request.get(`${this.baseUrl()}/matches`)
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          ScoreActions.loadScoresResponse(res);
        });
      });
  },

  createScore(team1Score, team2Score, team1, team2) {
    request.post(`${this.baseUrl()}/matches`)
      .send({ team1_score: team1Score, team2_score: team2Score, team1, team2 })
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          ScoreActions.createScoreResponse(res);
        });
      });
  },

  getStatsSummary() {
    request.get(`${this.baseUrl()}/stats/summary`)
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          StatsActions.loadStatsSummaryResponse(res);
        });
      });
  }
};

export default ApiClient;
