import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import _ from 'lodash';

import { createScore } from '../actions/scoreActions';
import NewScoreControls from '../components/scores/NewScoreControls';
import NewScoreHeader from '../components/scores/NewScoreHeader';


class NewScoreFormContainer extends React.Component {
  static propTypes = {
    players: array.isRequired,
    createScore: func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      team1Score: '',
      team2Score: '',
      team1: [],
      team2: [],
      players: []
    };
    this.onScore1Change = this.onScore1Change.bind(this);
    this.onScore2Change = this.onScore2Change.bind(this);
    this.onT1P1Select = this.onT1P1Select.bind(this);
    this.onT1P2Select = this.onT1P2Select.bind(this);
    this.onT2P1Select = this.onT2P1Select.bind(this);
    this.onT2P2Select = this.onT2P2Select.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ players: nextProps.players.slice(0) });
  }

  onScore1Change(event) {
    this.onScoreChange('team1Score', event.target.value);
  }

  onScore2Change(event) {
    this.onScoreChange('team2Score', event.target.value);
  }

  onScoreChange(attr, value) {
    let changes = {};
    changes[attr] = value;
    this.setState(changes);
  }

  onT1P1Select(id) {
    this.onPlayerSelect(id, 'team1', 0);
  }

  onT1P2Select(id) {
    this.onPlayerSelect(id, 'team1', 1);
  }

  onT2P1Select(id) {
    this.onPlayerSelect(id, 'team2', 0);
  }

  onT2P2Select(id) {
    this.onPlayerSelect(id, 'team2', 1);
  }

  onPlayerSelect(id, team, index) {
    let teamClone = this.state[team].slice(0);
    teamClone[index] = id;
    let changes = {};
    changes[team] = teamClone;
    this.setState(changes);
  }

  onSubmit() {
    this.props.createScore(this.state.team1Score, this.state.team2Score,
      _.compact(this.state.team1), _.compact(this.state.team2));
    this.setState({ team1Score: '', team2Score: '' });
  }

  render() {
    const players = _.reject(this.props.players, (p) => [..._.compact(this.state.team1), ..._.compact(this.state.team2)].includes(p.id));
    return (
      <div className="new-score panel panel-default">
        <div className="panel-heading">
          <h4>New Score</h4>
        </div>
        <div className="panel-body">
          <div className="form-inline clearfix text-center">
            <NewScoreHeader />
            <NewScoreControls
              players={players}
              team1Score={this.state.team1Score}
              team2Score={this.state.team2Score}
              onT1P1Select={this.onT1P1Select}
              onT1P2Select={this.onT1P2Select}
              onT2P1Select={this.onT2P1Select}
              onT2P2Select={this.onT2P2Select}
              onScore1Change={this.onScore1Change}
              onScore2Change={this.onScore2Change} />
          </div>
          <div className="text-center buttons">
            <button onClick={this.onSubmit} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createScore: (score1, score2, team1, team2) => {
      dispatch(createScore(score1, score2, team1, team2));
    }
  };
}

export default connect(null, mapDispatchToProps)(NewScoreFormContainer);
