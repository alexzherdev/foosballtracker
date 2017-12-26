import ApiClient from '../apiClient';
import * as types from '../constants/actionTypes';


function loadH2HOpponentsResponse(data) {
  return { type: types.LOAD_H2H_OPPONENTS_RESPONSE, data };
}

export function loadH2HOpponents(teamId) {
  return function(dispatch) {
    ApiClient.getH2HOpponents(teamId).then((res) => {
      dispatch(loadH2HOpponentsResponse(res.body));
    });
  };
}
