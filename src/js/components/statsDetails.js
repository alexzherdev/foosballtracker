import React from 'react';


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
          <td>{s.name}</td>
          <td>{s.played}</td>
          <td>{s.won}</td>
          <td>{s.lost}</td>
          <td>{s.goals_for}</td>
          <td>{s.goals_against}</td>
          <td>{s.goals_difference}</td>
          <td>{s.clean_sheets}</td>
        </tr>
      );
    };
    if (stats) {
      return (
        <div>
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Scored</th>
                <th>Conceded</th>
                <th>Goal Difference</th>
                <th>Clean Sheets</th>
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
        <div>Loading...</div>
      );
    }
  }
}
