import React from 'react';

import NewScoreForm from '../components/newScoreForm';
import RecentScores from '../components/recentScores';
import PlayerStore from '../stores/playerStore';
import PlayerActions from '../actions/playerActions';
import ScoreStore from '../stores/scoreStore';
import ScoreActions from '../actions/scoreActions';


export default class Scores extends React.Component {
  state = {
    scores: [],
    players: PlayerStore.getPlayers()
  };

  constructor() {
    super();
    this.onScoresChange = this.onScoresChange.bind(this);
    this.onPlayersChange = this.onPlayersChange.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  componentDidMount() {
    ScoreStore.addChangeListener(this.onScoresChange);
    PlayerStore.addChangeListener(this.onPlayersChange);
    ScoreActions.loadScorePage(1);
    PlayerActions.loadPlayers();
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this.onScoresChange);
    PlayerStore.removeChangeListener(this.onPlayersChange);
  }

  onScoresChange() {
    this.setState({ scores: ScoreStore.getPaginated() });
  }

  onPlayersChange() {
    this.setState({ players: PlayerStore.getPlayers() });
  }

  loadNextPage() {
    ScoreActions.loadScorePage(ScoreStore.getLastPageNum() + 1);
  }

  render() {
    return (
      <div className="scores">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Score History</h4>
            </div>
            <RecentScores scores={this.state.scores} />
            <div className="panel-footer text-right">
              <button
                className="btn btn-default btn-sm"
                onClick={this.loadNextPage}
                disabled={!ScoreStore.hasMorePages()}>More scores <span className="glyphicon glyphicon-menu-down"></span></button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <NewScoreForm players={this.state.players} />
        </div>
      </div>
    );
  }
}
