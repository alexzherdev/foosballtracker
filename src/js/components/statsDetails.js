import React from 'react';
import { Link } from 'react-router';

import { formatPercentage } from './utils';


export default class StatsDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stats = this.props.stats;

    let row = (s, i) => {
      return (
        <tr key={s.id}>
          <td><strong>{i}</strong></td>
          <td><Link to={`/stats/${s.id}`}>{s.name}</Link></td>
          <td>{s.played}</td>
          <td>{s.won}</td>
          <td>{s.lost}</td>
          <td>{formatPercentage(s.win_rate)}</td>
          <td>{s.goals_for}</td>
          <td>{s.goals_against}</td>
          <td>{s.goals_difference}</td>
          <td>{s.clean_sheets}</td>
          <td>{s.failed_to_score}</td>
        </tr>
      );
    };
    if (stats) {
      if (stats.length) {
        return (
          <div>
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Lost</th>
                  <th>Win Rate</th>
                  <th>Scored</th>
                  <th>Conceded</th>
                  <th>Goal Difference</th>
                  <th>Clean Sheets</th>
                  <th>Failed to Score</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, i) => row(s, i + 1))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div className="alert alert-info">No matches played just yet. Time to step up to the table!</div>
        );
      }
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
