import React from 'react';


export default class RecentScores extends React.Component {
  static propTypes = {
    scores: React.PropTypes.array.isRequired
  };

  constructor() {
    super();
  }

  render() {
    let items = this.props.scores.map((s) => (
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
  }
}
