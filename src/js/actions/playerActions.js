import KSDispatcher from 'dispatcher';
import PlayerConstants from 'playerConstants';
import ApiClient from 'apiClient';


const PlayerActions = {
  loadPlayers() {
    KSDispatcher.handleViewAction({ actionType: PlayerConstants.LOAD_PLAYERS });

    ApiClient.getPlayers();
  },

  loadPlayersResponse(response) {
    KSDispatcher.handleServerAction({ actionType: PlayerConstants.LOAD_PLAYERS_RESPONSE, data: response.body });
  },

  createPlayer(name) {
    KSDispatcher.handleViewAction({ actionType: PlayerConstants.CREATE_PLAYER, data: name });

    ApiClient.createPlayer(name);
  },

  createPlayerResponse(response) {
    KSDispatcher.handleServerAction({ actionType: PlayerConstants.CREATE_PLAYER_RESPONSE, data: response.body });
  }
};

export default PlayerActions;
