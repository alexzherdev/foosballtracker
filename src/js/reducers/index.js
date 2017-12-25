import * as types from '../constants/actionTypes';

const defaultState = {
  playersStats: [],
  players: [],
  stats: {},
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
      const paginatedScores = action.page === 1 ? [] : state.paginatedScores;
      return {
        ...state,
        paginatedScores,
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
    case types.LOAD_TEAM_STATS_RESPONSE:
      return {
        ...state,
        teamStats: {
          ...state.teamStats,
          [action.data.team.id]: action.data
        }
      };
    case types.LOAD_H2H_OPPONENTS_RESPONSE:
      return {
        ...state,
        h2hOpponents: action.data
      };
    case types.LOAD_H2H_MATCHES_RESPONSE:
      return {
        ...state,
        h2hMatches: action.data
      };
    default:
      return state;
  }
}
