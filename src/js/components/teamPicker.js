import React from 'react';

import _ from 'lodash';


export default class TeamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.getDisplayName() };
  }

  getDisplayName(id) {
    let team = _.find(this.props.teams, { id });
    return team ? team.name : 'Pick a team';
  }

  onTeamSelect(event) {
    event.preventDefault();
    let id = +event.target.dataset.id;
    this.setState({ name: this.getDisplayName(id) });
    this.props.onTeamSelect(id);
  }

  render() {
    let items = this.props.teams.map((t) => {
      return (<li key={t.id}><a href="#" data-id={t.id} onClick={this.onTeamSelect.bind(this)}>{t.name}</a></li>);
    });

    return (
      <div className="dropdown team-picker">
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
