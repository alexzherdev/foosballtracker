import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import ScoreConstants from '../constants/scoreConstants';


const CHANGE_EVENT = 'change';

const _store = [];

let ScoreStore = Object.assign({}, EventEmitter.prototype, {
  getAllScores() {
    return _store;
  },

  addScore(score) {
    _store.push(score);
  },

  setScores(scores) {
    _store.splice(0, _store.length, ...scores);
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
    case ScoreConstants.LOAD_SCORES_RESPONSE:
      ScoreStore.setScores(data);
      ScoreStore.emitChange();
      break;
    case ScoreConstants.CREATE_SCORE_RESPONSE:
      ScoreStore.addScore(data);
      ScoreStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default ScoreStore;
