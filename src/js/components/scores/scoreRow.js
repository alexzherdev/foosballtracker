import React from 'react';

import TeamLink from '../common/teamLink';


const ScoreRow = ({score}) => {
  return (
    <tr>
      <td>
        <span className="score-container">
          <span className="team-1">
            <TeamLink id={score.team1_id}>{score.team1_name}</TeamLink><strong>&nbsp;{score.team1_score}</strong>
          </span>
          <strong>-</strong>
          <span className="team-2">
            <strong>{score.team2_score}</strong>&nbsp;<TeamLink id={score.team2_id}>{score.team2_name}</TeamLink></span>
        </span>
      </td>
    </tr>
  );
};

ScoreRow.propTypes = {
  score: React.PropTypes.object.isRequired
};

export default ScoreRow;
