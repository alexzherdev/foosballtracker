import React from 'react';

import _ from 'lodash';

import PlayerPicker from './playerPicker';
import ScoreActions from '../actions/scoreActions';


export default class NewScore extends React.Component {
  state = {
    team1Score: '',
    team2Score: '',
    team1: [],
    team2: []
  };

  onScore1Change(event, attr) {
    this.onScoreChange('team1Score', event.target.value);
  }

  onScore2Change(event, attr) {
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
    ScoreActions.createScore(this.state.team1Score, this.state.team2Score,
      _.compact(this.state.team1), _.compact(this.state.team2));
    this.setState({ team1Score: '', team2Score: '' });
  }

  render() {
    return (
      <div className="col-md-6 new-score">
        <h4>New Score</h4>
        <div className="form-inline clearfix text-center">
          <div className="row">
            <div className="form-group col-md-4">
              <h4>Team 1</h4>
            </div>
            <div className="form-group col-md-4">
              <h4>VS</h4>
            </div>
            <div className="form-group col-md-4">
              <h4>Team 2</h4>
            </div>
          </div>
          <div className="row row-eq-height">
            <div className="col-md-4">
              <PlayerPicker players={this.props.players}
                playerId={this.state.team1[0]}
                onPlayerSelect={this.onT1P1Select.bind(this)} />
              <PlayerPicker players={this.props.players}
                onPlayerSelect={this.onT1P2Select.bind(this)} />
            </div>
            <div className="form-group form-group-lg col-md-4">
              <input
                type="text"
                value={this.state.team1Score}
                onChange={this.onScore1Change.bind(this)}
                className="form-control text-center" />
              <span className="colon">:</span>
              <input
                type="text"
                value={this.state.team2Score}
                onChange={this.onScore2Change.bind(this)}
                className="form-control text-center" />
            </div>
            <div className="col-md-4">
              <PlayerPicker players={this.props.players}
                onPlayerSelect={this.onT2P1Select.bind(this)} />
              <PlayerPicker players={this.props.players}
                onPlayerSelect={this.onT2P2Select.bind(this)} />
            </div>
          </div>
        </div>
        <div className="text-center buttons">
          <button onClick={this.onSubmit.bind(this)} className="btn btn-primary btn-lg">Save</button>
        </div>
      </div>
    );
  }
}
