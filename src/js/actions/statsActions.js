import FTDispatcher from '../dispatchers/dispatcher';
import StatsConstants from '../constants/statsConstants';
import ApiClient from '../apiClient';


const StatsActions = {
  loadStatsSummary() {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_STATS_SUMMARY });

    ApiClient.getStatsSummary();
  },

  loadStatsSummaryResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_STATS_SUMMARY_RESPONSE, data: response.body });
  },

  loadStats() {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_STATS });

    ApiClient.getStats();
  },

  loadStatsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_STATS_RESPONSE, data: response.body });
  },

  loadTeamStats(teamId) {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_TEAM_STATS });

    ApiClient.getTeamStats(teamId);
  },

  loadTeamStatsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_TEAM_STATS_RESPONSE, data: response.body });
  },

  loadH2HMatches(team1Id, team2Id) {
    FTDispatcher.handleViewAction({ actionType: StatsConstants.LOAD_H2H_MATCHES })

    ApiClient.getH2HMatches(team1Id, team2Id);
  },

  loadH2HMatchesResponse(response) {
    FTDispatcher.handleServerAction({ actionType: StatsConstants.LOAD_H2H_MATCHES_RESPONSE, data: response.body });
  }
};

export default StatsActions;
