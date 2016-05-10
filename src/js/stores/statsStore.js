import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import StatsConstants from '../constants/statsConstants';

const CHANGE_EVENT = 'change';

const _store = {
  summary: null,
  details: null
};

let StatsStore = Object.assign({}, EventEmitter.prototype, {
  getSummary() {
    return _store.summary;
  },

  getDetails() {
    return _store.details;
  },

  setSummary(summary) {
    _store.summary = summary;
  },

  setDetails(details) {
    _store.details = details;
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
    case StatsConstants.LOAD_STATS_RESPONSE:
      StatsStore.setDetails(data);
      StatsStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default StatsStore;
