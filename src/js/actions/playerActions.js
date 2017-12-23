import ApiClient from '../apiClient';
import { loadPlayersStats } from './statsActions';
import * as types from '../constants/actionTypes';


export function createPlayer(name) {
  return function(dispatch) {
    ApiClient.createPlayer(name).then(() => {
      dispatch(loadPlayersStats());
    });
  };
}

function loadPlayersResponse(data) {
  return { type: types.LOAD_PLAYERS_RESPONSE, data };
}

export function loadPlayers() {
  return function(dispatch) {
    ApiClient.getPlayers().then((res) => {
      dispatch(loadPlayersResponse(res.body));
    });
  };
}
