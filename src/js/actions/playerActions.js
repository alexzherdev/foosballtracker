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

  addPlayer(name) {
    KSDispatcher.handleViewAction({ actionType: PlayerConstants.ADD_PLAYER, data: name });
  }
};

export default PlayerActions;
