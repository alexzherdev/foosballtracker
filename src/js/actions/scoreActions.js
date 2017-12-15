import FTDispatcher from '../dispatchers/dispatcher';
import ScoreConstants from '../constants/scoreConstants';
import ScoreStore from '../stores/scoreStore';
import ApiClient from '../apiClient';


const ScoreActions = {
  loadScores() {
    FTDispatcher.handleViewAction({ actionType: ScoreConstants.LOAD_SCORES });

    ApiClient.getScores();
  },

  loadScoresResponse(response) {
    FTDispatcher.handleServerAction({ actionType: ScoreConstants.LOAD_SCORES_RESPONSE, data: response.body });
  },

  // teams are arrays of player ids
  createScore(team1Score, team2Score, team1, team2) {
    FTDispatcher.handleViewAction({ actionType: ScoreConstants.CREATE_SCORE });

    ApiClient.createScore(team1Score, team2Score, team1, team2);
  },

  createScoreResponse(response) {
    FTDispatcher.handleServerAction({ actionType: ScoreConstants.CREATE_SCORE_RESPONSE, data: response.body });
  },

  loadScorePage(page) {
    FTDispatcher.handleViewAction({ actionType: ScoreConstants.LOAD_SCORE_PAGE });

    ApiClient.getScorePage(page, ScoreStore.pageSize);
  },

  loadScorePageResponse(response) {
    FTDispatcher.handleServerAction({ actionType: ScoreConstants.LOAD_SCORE_PAGE_RESPONSE, data: response.body });
  },

  deleteScore(id) {
    FTDispatcher.handleViewAction({ actionType: ScoreConstants.DELETE_SCORE });

    ApiClient.deleteScore(id);
  },

  deleteScoreResponse(response) {
    FTDispatcher.handleServerAction({ actionType: ScoreConstants.DELETE_SCORE_RESPONSE, data: response.body });
  }
};

export default ScoreActions;
