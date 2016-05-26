import React from 'react';

import AddPlayer from '../components/addPlayer';
import PlayerList from '../components/playerList';
import StatsStore from '../stores/statsStore';
import StatsActions from '../actions/statsActions';


export default class Players extends React.Component {
  state = {
    players: StatsStore.getPlayersStats()
  };

  constructor() {
    super();
    this.onStatsChange = this.onStatsChange.bind(this);
  }

  componentDidMount() {
    StatsStore.addChangeListener(this.onStatsChange);
    StatsActions.loadPlayersStats();
  }

  componentWillUnmount() {
    StatsStore.removeChangeListener(this.onStatsChange);
  }

  onStatsChange() {
    this.setState({ players: StatsStore.getPlayersStats() });
  }

  render() {
    return (
      <div className="players">
        <div className="container-fluid">
          <h4>Players</h4>
          <PlayerList players={this.state.players} />
          <AddPlayer />
        </div>
      </div>
    );
  }
}
