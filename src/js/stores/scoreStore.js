import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import ScoreConstants from '../constants/scoreConstants';


const PAGE_SIZE = 10;

const CHANGE_EVENT = 'change';

const _store = {
  all: [],
  paginated: {
    lastPageLoaded: 0,
    pagesTotal: 0,
    scores: []
  }
};

let ScoreStore = Object.assign({}, EventEmitter.prototype, {
  get pageSize() {
    return PAGE_SIZE;
  },

  getAllScores() {
    return _store.all;
  },

  getLastPageNum() {
    return _store.paginated.lastPageLoaded;
  },

  hasMorePages() {
    return _store.paginated.lastPageLoaded < _store.paginated.pagesTotal;
  },

  getPaginated() {
    return _store.paginated.scores;
  },

  getLastPage() {
    const page = this.getLastPageNum();
    return _store.paginated.scores.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
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
      _store.all.splice(0, _store.all.length, ...data.items);
      ScoreStore.emitChange();
      break;
    case ScoreConstants.CREATE_SCORE_RESPONSE:
      _store.paginated.scores.splice(0, 0, data);
      ScoreStore.emitChange();
      break;
    case ScoreConstants.LOAD_SCORE_PAGE_RESPONSE: {
      const pagination = data.pagination;
      _store.paginated.lastPageLoaded = pagination.page;
      _store.paginated.pagesTotal = pagination.pageCount;
      _store.paginated.scores.splice((pagination.page - 1) * pagination.pageSize, data.items.length, ...data.items);
      ScoreStore.emitChange();
      break;
    }
  }
};
FTDispatcher.register(callback);

export default ScoreStore;
