import FTDispatcher from '../dispatchers/dispatcher';
import TeamConstants from '../constants/teamConstants';
import ApiClient from '../apiClient';


const TeamActions = {
  loadTeams() {
    FTDispatcher.handleViewAction({ actionType: TeamConstants.LOAD_TEAMS });

    ApiClient.getTeams();
  },

  loadTeamsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: TeamConstants.LOAD_TEAMS_RESPONSE, data: response.body });
  }
};

export default TeamActions;
