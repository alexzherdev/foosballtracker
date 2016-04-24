import FTDispatcher from '../dispatchers/dispatcher';
import PlayerConstants from '../constants/playerConstants';
import ApiClient from '../apiClient';


const PlayerActions = {
  loadPlayers() {
    FTDispatcher.handleViewAction({ actionType: PlayerConstants.LOAD_PLAYERS });

    ApiClient.getPlayers();
  },

  loadPlayersResponse(response) {
    FTDispatcher.handleServerAction({ actionType: PlayerConstants.LOAD_PLAYERS_RESPONSE, data: response.body });
  },

  createPlayer(name) {
    FTDispatcher.handleViewAction({ actionType: PlayerConstants.CREATE_PLAYER, data: name });

    ApiClient.createPlayer(name);
  },

  createPlayerResponse(response) {
    FTDispatcher.handleServerAction({ actionType: PlayerConstants.CREATE_PLAYER_RESPONSE, data: response.body });
  }
};

export default PlayerActions;
