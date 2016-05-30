import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import TeamConstants from '../constants/teamConstants';


const CHANGE_EVENT = 'change';

const _store = {
  all: [],
  h2hOpponents: []
};

let TeamStore = Object.assign({}, EventEmitter.prototype, {
  getTeams() {
    return _store.all;
  },

  getH2HOpponents() {
    return _store.h2hOpponents;
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

let callback = ({ action: { actionType, data }}) => {
  switch (actionType) {
    case TeamConstants.LOAD_TEAMS_RESPONSE:
      _store.all.splice(0, _store.all.length, ...data);
      TeamStore.emitChange();
      break;
    case TeamConstants.LOAD_H2H_OPPONENTS_RESPONSE:
      _store.h2hOpponents.splice(0, _store.h2hOpponents.length, ...data);
      TeamStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default TeamStore;
