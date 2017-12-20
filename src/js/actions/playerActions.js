import FTDispatcher from '../dispatchers/dispatcher';
import PlayerConstants from '../constants/playerConstants';
import ApiClient from '../apiClient';
import { loadPlayersStats } from './statsActions';


const PlayerActions = {
  loadPlayers() {
    FTDispatcher.handleViewAction({ actionType: PlayerConstants.LOAD_PLAYERS });

    ApiClient.getPlayers();
  },

  loadPlayersResponse(response) {
    FTDispatcher.handleServerAction({ actionType: PlayerConstants.LOAD_PLAYERS_RESPONSE, data: response.body });
  }
};

export function createPlayer(name) {
  return function(dispatch) {
    ApiClient.createPlayer(name).then(() => {
      dispatch(loadPlayersStats());
    });
  }
}

export default PlayerActions;
