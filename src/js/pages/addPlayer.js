import React from 'react';

import PlayerActions from 'playerActions';


export default class AddPlayer extends React.Component {
  state = {
    name: ''
  };

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSubmit() {
    PlayerActions.createPlayer(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            type="text"
            placeholder="New Player"
            value={this.state.name}
            onChange={this.onNameChange.bind(this)}
            className="form-control" />
        </div>&nbsp;
        <button onClick={this.onSubmit.bind(this)} className="btn btn-default">Add</button>
      </div>
    );
  }
}
