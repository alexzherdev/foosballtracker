import React from 'react';

import _ from 'lodash';

import Picker from './picker';


export default class TeamPicker extends React.Component {
  render() {
    return (
      <Picker className="team-picker"
        items={this.props.teams}
        onItemSelect={this.props.onTeamSelect}
        placeholder="Pick a team" />
    );
  }
}
