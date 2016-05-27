'use strict';

let rewire = require('rewire');
let PlayerConstants = require('../../constants/playerConstants').default;

describe('PlayerStore', () => {
  let PlayerStore, callback;

  beforeEach(() => {
    let playerStoreRew = rewire('../playerStore');
    PlayerStore = playerStoreRew.default;

    callback = playerStoreRew.__get__('callback');
  });

  it('returns no players initially', () => {
    let players = PlayerStore.getPlayers();
    expect(players).toEqual([]);
  });

  it('adds a player', () => {
    var createPlayerAction = { action: {
      actionType: PlayerConstants.CREATE_PLAYER_RESPONSE,
      data: { id: 1, name: 'Alex' }
    }};
    callback(createPlayerAction);

    let players = PlayerStore.getPlayers();
    expect(players).toEqual([{ id: 1, name: 'Alex' }]);
  });

  it('replaces players', () => {
    PlayerStore.addPlayer({ name: 'Alex', id: 1 });

    var createPlayerAction = { action: {
      actionType: PlayerConstants.LOAD_PLAYERS_RESPONSE,
      data: [{ id: 2, name: 'Jane' }]
    }};
    callback(createPlayerAction);

    let players = PlayerStore.getPlayers();
    expect(players).toEqual([{ name: 'Jane', id: 2 }]);
  });
});
