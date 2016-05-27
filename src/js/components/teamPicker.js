import React from 'react';

import Picker from './picker';


const TeamPicker = ({teams, onTeamSelect}) =>
  <Picker className="team-picker"
    items={teams}
    onItemSelect={onTeamSelect}
    placeholder="Pick a team" />;

TeamPicker.propTypes = {
  teams: React.PropTypes.array.isRequired,
  onTeamSelect: React.PropTypes.func.isRequired
};

export default TeamPicker;
