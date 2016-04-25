import React from 'react';

import AddPlayer from './addPlayer';
import PlayerStore from '../stores/playerStore';
import PlayerActions from '../actions/playerActions';


export default class Players extends React.Component {
  state = {
    players: PlayerStore.getPlayers()
  };

  constructor() {
    super();
    this.onPlayersChange = this.onPlayersChange.bind(this);
  }

  componentDidMount() {
    PlayerStore.addChangeListener(this.onPlayersChange);
    PlayerActions.loadPlayers();
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onPlayersChange);
  }

  onPlayersChange() {
    this.setState({ players: PlayerStore.getPlayers() });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.players.map((p) => (<li key={p.name}>{p.name}</li>))}
        </ul>
        <AddPlayer />
      </div>
    );
  }
}
