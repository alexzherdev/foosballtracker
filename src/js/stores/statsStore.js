import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import StatsConstants from '../constants/statsConstants';

const CHANGE_EVENT = 'change';

const _store = {
  summary: null
};

let StatsStore = Object.assign({}, EventEmitter.prototype, {
  getSummary() {
    return _store.summary;
  },

  setSummary(summary) {
    _store.summary = summary;
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
    case StatsConstants.LOAD_STATS_SUMMARY_RESPONSE:
      StatsStore.setSummary(data);
      StatsStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default StatsStore;
