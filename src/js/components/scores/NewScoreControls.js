import React from 'react';
import { array, func, number } from 'prop-types';

import PlayerPicker from '../playerPicker';

const NewScoreControls = ({ players, onT1P1Select, onT1P2Select,
  onT2P1Select, onT2P2Select, team1Score, team2Score,
  onScore1Change, onScore2Change }) => {
  return (
    <div className="row row-eq-height">
      <div className="col-md-4">
        <PlayerPicker players={players}
          onPlayerSelect={onT1P1Select} />
        <PlayerPicker players={players}
          onPlayerSelect={onT1P2Select} />
      </div>
      <div className="form-group form-group-lg col-md-4">
        <input
          type="text"
          value={team1Score}
          onChange={onScore1Change}
          className="form-control text-center" />
        <span className="dash">-</span>
        <input
          type="text"
          value={team2Score}
          onChange={onScore2Change}
          className="form-control text-center" />
      </div>
      <div className="col-md-4">
        <PlayerPicker players={players}
          onPlayerSelect={onT2P1Select} />
        <PlayerPicker players={players}
          onPlayerSelect={onT2P2Select} />
      </div>
    </div>
  );
}

NewScoreControls.propTypes = {
  players: array,
  onT1P1Select: func.isRequired,
  onT1P2Select: func.isRequired,
  onT2P1Select: func.isRequired,
  onT2P2Select: func.isRequired,
  onScore1Change: func.isRequired,
  onScore2Change: func.isRequired,
  team1Score: number,
  team2Score: number
};

export default NewScoreControls;
