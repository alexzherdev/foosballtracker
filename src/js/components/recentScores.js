import React from 'react';


const RecentScores = ({scores}) => {
  let items = scores.map((s) => (
    <li key={s.id}>{s.team1_score}:{s.team2_score}</li>
  ));

  return (
    <div>
      <h4>Recent Scores</h4>
      <ul>
        {items}
      </ul>
    </div>
  );
};

RecentScores.propTypes = {
  scores: React.PropTypes.array.isRequired
};

export default RecentScores;
