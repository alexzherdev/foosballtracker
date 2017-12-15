import React from 'react';

import TeamLink from '../common/teamLink';

const onTrashClickBound = (handler, id) => () => {
  handler(id);
}

const ScoreRow = ({score, onTrashClick}) => {
  let teamNames;
  if (score.team1_score > score.team2_score) {
    teamNames = [<strong>{score.team1_name}</strong>, score.team2_name];
  } else {
    teamNames = [score.team1_name, <strong>{score.team2_name}</strong>];
  }
  return (
    <tr>
      <td>
        <span className="score-container">
          <span className="team-1">
            <TeamLink id={score.team1_id}>{teamNames[0]}</TeamLink><strong>&nbsp;{score.team1_score}</strong>
          </span>
          <strong>-</strong>
          <span className="team-2">
            <strong>{score.team2_score}</strong>&nbsp;<TeamLink id={score.team2_id}>{teamNames[1]}</TeamLink></span>
        </span>
        <a className="delete-score" onClick={onTrashClickBound(onTrashClick, score.id)}>
          <span className="glyphicon glyphicon-trash"></span>
        </a>
      </td>
    </tr>
  );
};

ScoreRow.propTypes = {
  score: React.PropTypes.object.isRequired,
  onTrashClick: React.PropTypes.func.isRequired
};

export default ScoreRow;
