import FTDispatcher from '../dispatchers/dispatcher';
import StatsConstants from '../constants/statsConstants';
import * as types from '../constants/actionTypes';
import ApiClient from '../apiClient';



const StatsActions = {
  loadStatsSummary() {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_STATS_SUMMARY });

    ApiClient.getStatsSummary();
  },

  loadStatsSummaryResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_STATS_SUMMARY_RESPONSE, data: response.body });
  },

  loadTeamStats(teamId) {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_TEAM_STATS });

    ApiClient.getTeamStats(teamId);
  },

  loadTeamStatsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_TEAM_STATS_RESPONSE, data: response.body });
  },

  loadPlayersStats() {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_PLAYERS_STATS });

    ApiClient.getPlayersStats();
  },

  loadH2HMatches(team1Id, team2Id) {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_H2H_MATCHES })

    ApiClient.getH2HMatches(team1Id, team2Id);
  },

  loadH2HMatchesResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_H2H_MATCHES_RESPONSE, data: response.body });
  }
};

function loadPlayersStatsResponse(data) {
  return { type: types.LOAD_PLAYERS_STATS_RESPONSE, data };
}

export function loadPlayersStats() {
  return function(dispatch) {
    ApiClient.getPlayersStats().then((res) => {
      dispatch(loadPlayersStatsResponse(res.body));
    });
  }
}

function loadStatsResponse(data) {
  return { type: types.LOAD_STATS_RESPONSE, data };
}

export function loadStats() {
  return function(dispatch) {
    ApiClient.getStats().then((res) => {
      dispatch(loadStatsResponse(res.body));
    });
  }
}

export default StatsActions;
