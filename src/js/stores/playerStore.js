import { EventEmitter } from 'events';

import KSDispatcher from 'dispatcher';
import PlayerConstants from 'playerConstants';


const CHANGE_EVENT = 'change';

const _store = [];

let PlayerStore = Object.assign({}, EventEmitter.prototype, {
  getPlayers() {
    return _store;
  },

  setPlayers(players) {
    _store.splice(0, _store.length, ...players);
  },

  addPlayer(attributes) {
    _store.push(attributes);
  },

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
});

KSDispatcher.register(({ action: { actionType, data } }) => {
  switch (actionType) {
    case PlayerConstants.CREATE_PLAYER_RESPONSE:
      PlayerStore.addPlayer(data);
      PlayerStore.emitChange();
      break;
    case PlayerConstants.LOAD_PLAYERS_RESPONSE:
      PlayerStore.setPlayers(data);
      PlayerStore.emitChange();
      break;
  }
});

export default PlayerStore;
