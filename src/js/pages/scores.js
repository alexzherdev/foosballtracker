import React from 'react';

import NewScore from '../components/newScore';
import RecentScores from '../components/recentScores';
import PlayerStore from '../stores/playerStore';
import PlayerActions from '../actions/playerActions';
import ScoreStore from '../stores/scoreStore';
import ScoreActions from '../actions/scoreActions';


export default class Scores extends React.Component {
  state = {
    scores: ScoreStore.getAllScores(),
    players: PlayerStore.getPlayers()
  };

  constructor() {
    super();
    this.onScoresChange = this.onScoresChange.bind(this);
    this.onPlayersChange = this.onPlayersChange.bind(this);
  }

  componentDidMount() {
    ScoreStore.addChangeListener(this.onScoresChange);
    PlayerStore.addChangeListener(this.onPlayersChange);
    ScoreActions.loadScores();
    PlayerActions.loadPlayers();
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this.onScoresChange);
    PlayerStore.removeChangeListener(this.onPlayersChange);
  }

  onScoresChange() {
    this.setState({ scores: ScoreStore.getAllScores() });
  }

  onPlayersChange() {
    this.setState({ players: PlayerStore.getPlayers() });
  }

  render() {
    return (
      <div className="container-fluid">
        <RecentScores scores={this.state.scores} />
        <NewScore players={this.state.players} />
      </div>
    );
  }
}
