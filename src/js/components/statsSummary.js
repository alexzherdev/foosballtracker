import React from 'react';

import { formatPercentage } from './utils';


export default class StatsSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stats = this.props.stats;

    if (stats) {
      let winRateRow;
      if (stats.bestWinRate) {
        winRateRow = (
          <tr>
            <td>Best win rate</td>
            <td>{stats.bestWinRate.name} ({formatPercentage(stats.bestWinRate.rate)})</td>
          </tr>
        );
      }
      return (
        <div className="stats-summary">
          <table className="table">
            <tbody>
              <tr>
                <td>Matches played</td>
                <td>{stats.matchesPlayed}</td>
              </tr>
              <tr>
                <td>Matches played daily on avg</td>
                <td>{stats.avgMatchesDaily || 'never played'}</td>
              </tr>
              {winRateRow}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
