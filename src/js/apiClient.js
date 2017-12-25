import request from 'superagent';
import toastr from 'toastr';

import ScoreActions from './actions/scoreActions';
import TeamActions from './actions/teamActions';

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
    return `${config.url}/api`;
  },

  createPlayer(name) {
    return request.post(`${this.baseUrl()}/players`).send({ name });
  },

  getPlayers() {
    return request.get(`${this.baseUrl()}/players`);
  },

  getPlayersStats() {
    return request.get(`${this.baseUrl()}/stats/players`);
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
    return request.post(`${this.baseUrl()}/matches`)
      .send({ team1_score: team1Score, team2_score: team2Score, team1, team2 });
  },

  deleteScore(id) {
    return request.delete(`${this.baseUrl()}/matches/${id}`);
  },

  getStatsSummary() {
    return request.get(`${this.baseUrl()}/stats/summary`);
  },

  getStats() {
    return request.get(`${this.baseUrl()}/stats`);
  },

  getTeamStats(teamId) {
    return request.get(`${this.baseUrl()}/stats/${teamId}`);
  },

  getTeams() {
    request.get(`${this.baseUrl()}/teams`)
      .end((err, res) => {
        handleResponse(err, res, (err, res) => {
          TeamActions.loadTeamsResponse(res);
        });
      });
  },

  getH2HOpponents(teamId) {
    return request.get(`${this.baseUrl()}/teams/${teamId}/opponents`);
  },

  getH2HMatches(team1Id, team2Id) {
    return request.get(`${this.baseUrl()}/matches/h2h`)
      .query({ team1_id: team1Id, team2_id: team2Id });
  },

  getScorePage(page, pageSize) {
    return request.get(`${this.baseUrl()}/matches`)
      .query({ page, page_size: pageSize });
  }
};

export default ApiClient;
