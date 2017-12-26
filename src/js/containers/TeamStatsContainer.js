import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { array, func, number, object } from 'prop-types';

import TeamGeneral from '../components/teamStats/general';
import TeamScoring from '../components/teamStats/scoring';
import TeamStreaks from '../components/teamStats/streaks';
import TeamRecentScores from '../components/teamStats/recentScores';
import TeamHeadToHead from '../components/teamStats/headToHead';
import { loadH2HOpponents } from '../actions/teamActions';
import { loadTeamStats, loadH2HMatches } from '../actions/statsActions';


class TeamStatsContainer extends React.Component {
  static propTypes = {
    params: object.isRequired,
    loadTeamStats: func.isRequired,
    loadH2HOpponents: func.isRequired,
    loadH2HMatches: func.isRequired,
    stats: object,
    teams: array,
    h2hMatches: array
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.teamId = +this.props.params.teamId;
  }

  componentDidMount() {
    this.props.loadTeamStats(this.teamId);
    this.props.loadH2HOpponents(this.teamId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.h2hTeamId) {
      this.setState({ h2hStats: nextProps.teamStats[this.state.h2hTeamId] });
    }
  }

  onH2HTeamSelect(id) {
    this.setState({ h2hTeamId: id});
    this.props.loadTeamStats(id);
    this.props.loadH2HMatches(this.teamId, id);
  }

  render() {
    const stats = this.props.stats;
    if (!stats) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="team-stats">
        <div className="container-fluid">
          <h4>{stats.team.name} Stats</h4>
          <Link to="/stats">Back to Stats</Link>
        </div>

        <div className="col-md-3">
          <TeamGeneral stats={stats.stats} />
          <TeamScoring stats={stats.stats} />
          <TeamStreaks stats={stats.stats} />
        </div>
        <div className="col-md-3">
          <TeamRecentScores scores={stats.scores} team={stats.team} />
        </div>
        <div className="col-md-6">
          <TeamHeadToHead
            stats={stats}
            teams={this.props.teams}
            onTeamSelect={this.onH2HTeamSelect.bind(this)}
            h2hStats={this.state.h2hStats}
            h2hMatches={this.props.h2hMatches} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stats: state.teamStats && state.teamStats[+ownProps.params.teamId],
    teams: state.h2hOpponents,
    teamStats: state.teamStats,
    h2hMatches: state.h2hMatches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTeamStats: (teamId) => {
      dispatch(loadTeamStats(teamId));
    },

    loadH2HOpponents: (teamId) => {
      dispatch(loadH2HOpponents(teamId));
    },

    loadH2HMatches: (team1Id, team2Id) => {
      dispatch(loadH2HMatches(team1Id, team2Id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamStatsContainer);
