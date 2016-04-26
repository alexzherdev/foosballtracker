import React from 'react';

import _ from 'underscore';

import PlayerActions from '../actions/playerActions';


export default class PlayerPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.getDisplayName(props.playerId) };
  }

  getDisplayName(id) {
    let player = _.findWhere(this.props.players, { id });
    return player ? player.name : 'Select';
  }

  onPlayerSelect(event) {
    event.preventDefault();
    let id = +event.target.dataset.id;
    this.setState({ name: this.getDisplayName(id) });
    this.props.onPlayerSelect(id);
  }

  render() {
    let items = this.props.players.map((p) => {
      return (<li key={p.id}><a href="#" data-id={p.id} onClick={this.onPlayerSelect.bind(this)}>{p.name}</a></li>);
    });
    return (
      <div className="dropdown player-picker">
        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
          {this.state.name} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
}
