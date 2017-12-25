import * as types from '../constants/actionTypes';
import ApiClient from '../apiClient';


function loadH2HMatchesResponse(data) {
  return { type: types.LOAD_H2H_MATCHES_RESPONSE, data };
}

export function loadH2HMatches(team1Id, team2Id) {
  return function(dispatch) {
    ApiClient.getH2HMatches(team1Id, team2Id).then((res) => {
      dispatch(loadH2HMatchesResponse(res.body));
    });
  };
}

function loadPlayersStatsResponse(data) {
  return { type: types.LOAD_PLAYERS_STATS_RESPONSE, data };
}

export function loadPlayersStats() {
  return function(dispatch) {
    ApiClient.getPlayersStats().then((res) => {
      dispatch(loadPlayersStatsResponse(res.body));
    });
  };
}

function loadStatsResponse(data) {
  return { type: types.LOAD_STATS_RESPONSE, data };
}

export function loadStats() {
  return function(dispatch) {
    ApiClient.getStats().then((res) => {
      dispatch(loadStatsResponse(res.body));
    });
  };
}

function loadStatsSummaryResponse(data) {
  return { type: types.LOAD_STATS_SUMMARY_RESPONSE, data };
}

export function loadStatsSummary() {
  return function(dispatch) {
    ApiClient.getStatsSummary().then((res) => {
      dispatch(loadStatsSummaryResponse(res.body));
    });
  };
}

function loadTeamStatsResponse(data) {
  return { type: types.LOAD_TEAM_STATS_RESPONSE, data };
}

export function loadTeamStats(teamId) {
  return function(dispatch) {
    ApiClient.getTeamStats(teamId).then((res) => {
      dispatch(loadTeamStatsResponse(res.body));
    });
  };
}
