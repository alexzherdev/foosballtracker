import KSDispatcher from 'dispatcher';
import PlayerConstants from 'playerConstants';


const PlayerActions = {
  addPlayer(name) {
    KSDispatcher.handleAction({ actionType: PlayerConstants.ADD_PLAYER, data: name });
  }
};

export default PlayerActions;