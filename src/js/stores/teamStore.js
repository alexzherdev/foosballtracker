import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import TeamConstants from '../constants/teamConstants';


const CHANGE_EVENT = 'change';

const _store = [];

let TeamStore = Object.assign({}, EventEmitter.prototype, {
  getTeams() {
    return _store;
  },

  setTeams(teams) {
    _store.splice(0, _store.length, ...teams);
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
      TeamStore.setTeams(data);
      TeamStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default TeamStore;
