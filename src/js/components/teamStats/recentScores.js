import React from 'react';

import TeamScoreRow from './teamScoreRow';


const TeamRecentScores = ({scores, team}) => {
  return (
    <div className="panel panel-default recent-scores">
      <div className="panel-heading">
        <h5 className="panel-title">Recent Scores</h5>
      </div>

      <table className="table table-condensed table-bordered">
        <tbody>
          {scores.map((score) =>
            <TeamScoreRow score={score} team={team} key={score.id} />
          )}
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
