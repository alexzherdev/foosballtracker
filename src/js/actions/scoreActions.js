import FTDispatcher from '../dispatchers/dispatcher';
import ScoreConstants from '../constants/scoreConstants';
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
  }
};

export default ScoreActions;
