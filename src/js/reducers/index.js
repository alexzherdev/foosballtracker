import * as types from '../constants/actionTypes';

const defaultState = {
  playersStats: [],
  players: [],
  stats: [],
  statsSummary: {},
  currentScorePage: 1,
  paginatedScores: [],
  lastPageLoaded: 0,
  hasMoreScores: false
};

export default function(state = defaultState, action) {
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
    case types.SET_CURRENT_SCORE_PAGE:
      return {
        ...state,
        currentScorePage: action.page
      };
    case types.LOAD_SCORE_PAGE_RESPONSE:
      const pagination = action.data.pagination;
      return {
        ...state,
        paginatedScores: [...state.paginatedScores, ...action.data.items],
        lastPageLoaded: pagination.page,
        hasMoreScores: pagination.page < pagination.pageCount
      };
    case types.LOAD_PLAYERS_RESPONSE:
      return {
        ...state,
        players: action.data
      };
    case types.CREATE_SCORE_RESPONSE:
      return {
        ...state,
        paginatedScores: [action.data, ...state.paginatedScores]
      };
    default:
      return state;
  }
}
