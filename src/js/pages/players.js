import React from 'react';

import AddPlayerForm from '../components/addPlayerForm';
import PlayerList from '../components/playerList';
import StatsStore from '../stores/statsStore';
import StatsActions from '../actions/statsActions';
import PlayerActions from '../actions/playerActions';


export default class Players extends React.Component {
  state = {
    players: StatsStore.getPlayersStats()
  };

  constructor() {
    super();
    this.onStatsChange = this.onStatsChange.bind(this);
    this.onPlayerCreate = this.onPlayerCreate.bind(this);
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

  onPlayerCreate(name) {
    PlayerActions.createPlayer(name);
  }

  render() {
    return (
      <div className="players">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Players</h4>
            </div>
            <PlayerList players={this.state.players} />
            <div className="panel-footer">
              <AddPlayerForm onPlayerCreate={this.onPlayerCreate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
