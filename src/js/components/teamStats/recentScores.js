import React from 'react';
import moment from 'moment';
import classnames from 'classnames';


const TeamRecentScores = ({scores, team}) => {
  let row = (score, i) => {
    let teamScore, opponentScore;
    if (score.team1_id === team.id) {
      [teamScore, opponentScore] = [score.team1_score, score.team2_score];
    } else {
      [teamScore, opponentScore] = [score.team2_score, score.team1_score];
    }
    let rowClass = teamScore > opponentScore ? 'success' : 'danger';
    return (
      <tr className={rowClass} key={`score-${i}`}>
        <td>
          <span className="score-date"><em>{moment(score.created_at).format('MMM D')}</em></span>
          <span>{team.name} <strong>{teamScore} - {opponentScore}</strong> {score.name}</span>
          <span className="abbr-container">
            <span className={classnames('pull-right', 'text-danger', { 'hide': teamScore > 0 })}>
              <abbr title="Failed to score">FS</abbr>
            </span>
            <span className={classnames('pull-right', 'text-success', { 'hide': opponentScore > 0 })}>
              <abbr title="Clean sheet">CS</abbr>
            </span>
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="panel panel-default recent-scores">
      <div className="panel-heading">
        <h5 className="panel-title">Recent Scores</h5>
      </div>

      <table className="table table-condensed table-bordered">
        <tbody>
          {scores.map(row)}
        </tbody>
      </table>
    </div>
  );
};

TeamRecentScores.propTypes = {
  scores: React.PropTypes.array.isRequired,
  team: React.PropTypes.object.isRequired
};

export default TeamRecentScores;