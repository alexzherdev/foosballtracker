import { EventEmitter } from 'events';

import FTDispatcher from '../dispatchers/dispatcher';
import StatsConstants from '../constants/statsConstants';

const CHANGE_EVENT = 'change';

const _store = {
  summary: null,
  details: null,
  playersStats: [],
  teamStats: {},
  h2hMatches: []
};

let StatsStore = Object.assign({}, EventEmitter.prototype, {
  getSummary() {
    return _store.summary;
  },

  getDetails() {
    return _store.details;
  },

  getTeamStats(teamId) {
    return _store.teamStats[teamId];
  },

  getPlayersStats() {
    return _store.playersStats;
  },

  getH2HMatches() {
    return _store.h2hMatches;
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
      _store.summary = data;
      StatsStore.emitChange();
      break;
    case StatsConstants.LOAD_STATS_RESPONSE:
      _store.details = data;
      StatsStore.emitChange();
      break;
    case StatsConstants.LOAD_TEAM_STATS_RESPONSE:
      _store.teamStats[data.team.id] = data;
      StatsStore.emitChange();
      break;
    case StatsConstants.LOAD_H2H_MATCHES_RESPONSE:
      _store.h2hMatches = data;
      StatsStore.emitChange();
      break;
    case StatsConstants.LOAD_PLAYERS_STATS_RESPONSE:
      _store.playersStats = data;
      StatsStore.emitChange();
      break;
  }
};
FTDispatcher.register(callback);

export default StatsStore;
