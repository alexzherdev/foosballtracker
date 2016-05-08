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
  }
};

export default StatsActions;
