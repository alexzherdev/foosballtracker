import React from 'react';
import { object } from 'prop-types';

import { formatDecimal } from '../utils';


const TeamScoring = ({stats}) =>
  <div className="panel panel-default scoring">
    <div className="panel-heading">
      <h5 className="panel-title">Scoring</h5>
    </div>

    <table className="table table-condensed table-bordered">
      <tbody>
        <tr>
          <td>Scored</td>
          <td className="success">{stats.goals_for}</td>
        </tr>
        <tr>
          <td>Conceded</td>
          <td className="danger">{stats.goals_against}</td>
        </tr>
        <tr>
          <td>Scored per match</td>
          <td className="success">{formatDecimal(stats.scored_per_match)}</td>
        </tr>
        <tr>
          <td>Conceded per match</td>
          <td className="danger">{formatDecimal(stats.conceded_per_match)}</td>
        </tr>
        <tr>
          <td>Clean sheets</td>
          <td className="success">{stats.clean_sheets}</td>
        </tr>
        <tr>
          <td>Failed to score</td>
          <td className="danger">{stats.failed_to_score}</td>
        </tr>
      </tbody>
    </table>
  </div>;

TeamScoring.propTypes = {
  stats: object.isRequired
};

export default TeamScoring;
