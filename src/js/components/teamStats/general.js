import React from 'react';

import { formatPercentage } from '../utils';


const TeamGeneral = ({stats}) =>
  <div className="panel panel-default general">
    <div className="panel-heading">
      <h5 className="panel-title">General</h5>
    </div>

    <table className="table table-condensed table-bordered">
      <tbody>
        <tr>
          <td>Played</td>
          <td>{stats.played}</td>
        </tr>
        <tr>
          <td>Won</td>
          <td className="success">{stats.won}</td>
        </tr>
        <tr>
          <td>Lost</td>
          <td className="danger">{stats.lost}</td>
        </tr>
        <tr>
          <td>Win rate</td>
          <td className="">{formatPercentage(stats.win_rate)}</td>
        </tr>
      </tbody>
    </table>
  </div>;

TeamGeneral.propTypes = {
  stats: React.PropTypes.object.isRequired
};

export default TeamGeneral;
