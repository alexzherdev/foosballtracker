import { EventEmitter } from 'events';

import KSDispatcher from 'dispatcher';
import PlayerConstants from 'playerConstants';


const CHANGE_EVENT = 'change';

const _store = [{ name: 'Alex' }, { name: 'Denis' }];

let PlayerStore = Object.assign({}, EventEmitter.prototype, {
  getPlayers() {
    return _store;
  },

  addPlayer(value) {
    _store.push({name: value});
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
    case PlayerConstants.ADD_PLAYER:
      PlayerStore.addPlayer(data);
      PlayerStore.emitChange();
      break;
  }
});

export default PlayerStore;
