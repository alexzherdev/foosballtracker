import React from 'react';
import { array, func } from 'prop-types';

import Picker from './picker';


const TeamPicker = ({teams, onTeamSelect, getLabel}) => {
  const items = [];
  let played = false, neverPlayed = false;

  teams.forEach((t) => {
    if (t.played > 0 && !played) {
      items.push({ isHeader: true, name: 'Teams played against (matches played)' });
      played = true;
    } else if (t.played === 0 && !neverPlayed) {
      items.push({ isHeader: true, name: 'Never played against' });
      neverPlayed = true;
    }
    items.push(t);
  });
  return (
    <Picker className="team-picker"
      items={items}
      getItemLabel={getLabel}
      onItemSelect={onTeamSelect}
      placeholder="Pick a team" />
  );
};

TeamPicker.propTypes = {
  teams: array.isRequired,
  onTeamSelect: func.isRequired,
  getLabel: func
};

export default TeamPicker;
