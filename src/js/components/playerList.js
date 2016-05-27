import React from 'react';

import { formatPercentage } from './utils';


const PlayerList = ({players}) => {
  const tbody = (
    <tbody>
      {players.map((p) => {
        return (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.played}</td>
            <td>{p.won}</td>
            <td>{p.lost}</td>
            <td>{formatPercentage(p.win_rate)}</td>
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <table className="table table-condensed table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Played</th>
          <th>Won</th>
          <th>Lost</th>
          <th>Win Rate</th>
        </tr>
      </thead>
      {tbody}
    </table>
  );
};

PlayerList.propTypes = {
  players: React.PropTypes.array.isRequired
};

export default PlayerList;
