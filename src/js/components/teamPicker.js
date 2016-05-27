import React from 'react';

import Picker from './picker';


const TeamPicker = ({teams, onTeamSelect}) =>
  <Picker className="team-picker"
    items={teams}
    onItemSelect={onTeamSelect}
    placeholder="Pick a team" />;

export default TeamPicker;
