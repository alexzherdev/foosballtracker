import React from 'react';

import PlayerStore from '../stores/playerStore';
import PlayerActions from '../actions/playerActions';
import ScoreStore from '../stores/scoreStore';
import ScoreActions from '../actions/scoreActions';
import StatsStore from '../stores/statsStore';
import StatsActions from '../actions/statsActions';
import StatsSummary from '../components/statsSummary';


export default class Home extends React.Component {
  state = {
    scores: ScoreStore.getAllScores(),
    players: PlayerStore.getPlayers(),
    statsSummary: StatsStore.getSummary()
  };

  constructor() {
    super();
    this.onScoresChange = this.onScoresChange.bind(this);
    this.onPlayersChange = this.onPlayersChange.bind(this);
    this.onStatsChange = this.onStatsChange.bind(this);
  }

  componentDidMount() {
    ScoreStore.addChangeListener(this.onScoresChange);
    PlayerStore.addChangeListener(this.onPlayersChange);
    StatsStore.addChangeListener(this.onStatsChange);
    ScoreActions.loadScores();
    PlayerActions.loadPlayers();
    StatsActions.loadStatsSummary();
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this.onScoresChange);
    PlayerStore.removeChangeListener(this.onPlayersChange);
    StatsStore.removeChangeListener(this.onStatsChange);
  }

  onScoresChange() {
    this.setState({ scores: ScoreStore.getAllScores() });
  }

  onPlayersChange() {
    this.setState({ players: PlayerStore.getPlayers() });
  }

  onStatsChange() {
    this.setState({ statsSummary: StatsStore.getSummary() });
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <h4>Stats Summary</h4>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#twovtwo" aria-controls="twovtwo" role="tab" data-toggle="tab">2v2</a></li>
          <li role="presentation"><a href="#onevone" aria-controls="onevone" role="tab" data-toggle="tab">1v1</a></li>
          <li role="presentation"><a href="#overall" aria-controls="overall" role="tab" data-toggle="tab">Overall</a></li>
        </ul>
        <div className="tab-content container-fluid">
          <div role="tabpanel" className="tab-pane active" id="twovtwo">
            <StatsSummary stats={this.state.statsSummary && this.state.statsSummary.twovtwo} />
          </div>
          <div role="tabpanel" className="tab-pane" id="onevone">
            <StatsSummary stats={this.state.statsSummary && this.state.statsSummary.onevone} />
          </div>
          <div role="tabpanel" className="tab-pane" id="overall">
            <StatsSummary stats={this.state.statsSummary && this.state.statsSummary.overall} />
          </div>
        </div>

      </div>
    );
  }
}
