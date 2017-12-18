import React from 'react';
import { object } from 'prop-types';


const TeamStreaks = ({stats}) => {
  let currentStreak = stats.streaks.current;
  let currentStreakText, currentStreakClass;
  if (currentStreak.wins) {
    currentStreakText = `${currentStreak.wins} wins`;
    currentStreakClass = 'success';
  } else {
    currentStreakText = `${currentStreak.defeats} defeats`;
    currentStreakClass = 'danger';
  }
  return (
    <div className="panel panel-default streaks">
      <div className="panel-heading">
        <h5 className="panel-title">Streaks</h5>
      </div>

      <table className="table table-condensed table-bordered">
        <tbody>
          <tr>
            <td>Current streak</td>
            <td className={currentStreakClass}>{currentStreakText}</td>
          </tr>
          <tr>
            <td>Longest winning streak</td>
            <td className="success">{stats.streaks.longest.wins} wins</td>
          </tr>
          <tr>
            <td>Longest losing streak</td>
            <td className="danger">{stats.streaks.longest.defeats} defeats</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

TeamStreaks.propTypes = {
  stats: object.isRequired
};

export default TeamStreaks;
