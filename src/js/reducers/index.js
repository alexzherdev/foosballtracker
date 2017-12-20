import * as types from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case types.LOAD_PLAYERS_STATS_RESPONSE:
      return {
        ...state,
        playersStats: action.data
      };
    case types.LOAD_STATS_RESPONSE:
      return {
        ...state,
        stats: action.data
      };
    case types.LOAD_STATS_SUMMARY_RESPONSE:
      return {
        ...state,
        statsSummary: action.data
      };
    default:
      return state;
  }
}
