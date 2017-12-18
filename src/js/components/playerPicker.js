import React from 'react';
import { array, func } from 'prop-types';

import Picker from './picker';


const PlayerPicker = ({players, onPlayerSelect}) =>
  <Picker className="player-picker"
    items={players}
    onItemSelect={onPlayerSelect}
    placeholder="Select"
    usePlaceholderItem={true} />;

PlayerPicker.propTypes = {
  players: array.isRequired,
  onPlayerSelect: func.isRequired
}

export default PlayerPicker;
