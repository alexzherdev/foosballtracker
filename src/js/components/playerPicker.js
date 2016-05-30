import React from 'react';

import Picker from './picker';


const PlayerPicker = ({players, onPlayerSelect}) =>
  <Picker className="player-picker"
    items={players}
    onItemSelect={onPlayerSelect}
    placeholder="Select"
    usePlaceholderItem={true} />;

PlayerPicker.propTypes = {
  players: React.PropTypes.array.isRequired,
  onPlayerSelect: React.PropTypes.func.isRequired
}

export default PlayerPicker;
