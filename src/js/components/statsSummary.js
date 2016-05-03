import React from 'react';


export default class StatsSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stats = this.props.stats;
    if (stats) {
      return (
        <div>
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
              <tr>
                <td>Best win rate</td>
                <td>{stats.bestWinRate.name} ({stats.bestWinRate.rate * 100}%)</td>
              </tr>
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
