import React from 'react';
import { connect } from 'react-redux';
import { array, bool, func } from 'prop-types';

import NewScoreFormContainer from './NewScoreFormContainer';
import RecentScores from '../components/recentScores';
import { loadPlayers } from '../actions/playerActions';
import { loadScorePage, deleteScore } from '../actions/scoreActions';


class ScoresContainer extends React.Component {
  static propTypes = {
    loadScorePage: func.isRequired,
    loadPlayers: func.isRequired,
    deleteScore: func.isRequired,
    scores: array,
    hasMoreScores: bool,
    players: array
  }
  constructor(props) {
    super(props);
    this.onDeleteScore = this.onDeleteScore.bind(this);
    this.onMoreScoresClick = this.onMoreScoresClick.bind(this);
  }

  componentDidMount() {
    this.props.loadScorePage(1);
    this.props.loadPlayers();
  }

  onMoreScoresClick() {
    this.props.loadScorePage();
  }

  onDeleteScore(id) {
    if (confirm('Are you sure?')) {
      this.props.deleteScore(id);
    }
  }

  render() {
    return (
      <div className="scores">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Score History</h4>
            </div>
            <RecentScores
              scores={this.props.scores}
              onDeleteScoreClick={this.onDeleteScore} />
            <div className="panel-footer text-right">
              <button
                className="btn btn-default btn-sm"
                onClick={this.onMoreScoresClick}
                disabled={!this.props.hasMoreScores}>More scores <span className="glyphicon glyphicon-menu-down"></span></button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <NewScoreFormContainer players={this.props.players} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scores: state.paginatedScores,
    players: state.players,
    hasMoreScores: state.hasMoreScores
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadScorePage: (page) => {
      dispatch(loadScorePage(page));
    },
    loadPlayers: () => {
      dispatch(loadPlayers());
    },
    deleteScore: (id) => {
      dispatch(deleteScore(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoresContainer);
