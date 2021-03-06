import React from 'react';
import moment from 'moment';
import { array, func } from 'prop-types';

import ScoreRow from './scores/scoreRow';

const RecentScores = ({scores, onDeleteScoreClick}) => {
  let rows = [];
  let curDate = null;
  for (let i = 0; i < scores.length; i++) {
    const s = scores[i];
    if (!moment(s.created_at).isSame(curDate, 'day')) {
      rows.push(
        <tr key={`date-${s.id}`} className="active">
          <td>
            <strong>{moment(s.created_at).format('MMM D')}</strong>
          </td>
        </tr>
      );
      curDate = s.created_at;
    }
    rows.push(<ScoreRow score={s} key={s.id} onTrashClick={onDeleteScoreClick} />);
  }
  return (
    <table className="table table-condensed table-bordered">
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

RecentScores.propTypes = {
  scores: array.isRequired,
  onDeleteScoreClick: func.isRequired
};

export default RecentScores;
