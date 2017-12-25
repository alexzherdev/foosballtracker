import FTDispatcher from '../dispatchers/dispatcher';
import TeamConstants from '../constants/teamConstants';
import ApiClient from '../apiClient';
import * as types from '../constants/actionTypes';


const TeamActions = {
  loadTeams() {
    FTDispatcher.handleViewAction({ actionType: TeamConstants.LOAD_TEAMS });

    ApiClient.getTeams();
  },

  loadTeamsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: TeamConstants.LOAD_TEAMS_RESPONSE, data: response.body });
  },

  loadH2HOpponents(teamId) {
    FTDispatcher.handleViewAction({ actionType: TeamConstants.LOAD_H2H_OPPONENTS });

    ApiClient.getH2HOpponents(teamId);
  },

  loadH2HOpponentsResponse(response) {
    FTDispatcher.handleServerAction({ actionType: TeamConstants.LOAD_H2H_OPPONENTS_RESPONSE, data: response.body });
  }
};

function loadH2HOpponentsResponse(data) {
  return { type: types.LOAD_H2H_OPPONENTS_RESPONSE, data };
}

export function loadH2HOpponents(teamId) {
  return function(dispatch) {
    ApiClient.getH2HOpponents(teamId).then((res) => {
      dispatch(loadH2HOpponentsResponse(res.body));
    });
  };
}

export default TeamActions;
