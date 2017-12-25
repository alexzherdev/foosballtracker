import toastr from 'toastr';

import ApiClient from '../apiClient';
import * as types from '../constants/actionTypes';

toastr.options.closeButton = true;

const notification = (style, text) => {
  toastr[style](text);
};


function createScoreResponse(data) {
  return { type: types.CREATE_SCORE_RESPONSE, data };
}

export function createScore(team1Score, team2Score, team1, team2) {
  return function(dispatch) {
    ApiClient.createScore(team1Score, team2Score, team1, team2).then((res) => {
      dispatch(createScoreResponse(res.body));
    });
  };
}

function setCurrentScorePage(page) {
  return { type: types.SET_CURRENT_SCORE_PAGE, page };
}

function loadScorePageResponse(data) {
  return { type: types.LOAD_SCORE_PAGE_RESPONSE, data };
}

export function loadScorePage(page) {
  return function(dispatch, getState) {
    if (page === undefined) {
      page = getState().currentScorePage + 1;
    }
    dispatch(setCurrentScorePage(page));
    ApiClient.getScorePage(page, 10).then((res) => {
      dispatch(loadScorePageResponse(res.body));
    });
  };
}

function deleteScoreResponse(data) {
  return { type: types.DELETE_SCORE_RESPONSE, data };
}

export function deleteScore(id) {
  return function(dispatch) {
    ApiClient.deleteScore(id).then((res) => {
      notification('success', 'Match score was successfully deleted.');
      dispatch(deleteScoreResponse(res.body));
    });
  };
}
