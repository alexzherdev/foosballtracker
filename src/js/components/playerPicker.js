import React from 'react';

import Picker from './picker';


const PlayerPicker = ({players, onPlayerSelect}) =>
  <Picker className="player-picker"
    items={players}
    onItemSelect={onPlayerSelect}
    placeholder="Select" />;

export default PlayerPicker;
