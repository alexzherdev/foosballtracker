import React from 'react';
import { Link } from 'react-router';

import _ from 'lodash';

import StatsStore from '../stores/statsStore';
import StatsActions from '../actions/statsActions';
import TeamActions from '../actions/teamActions';
import TeamStore from '../stores/teamStore';
import TeamGeneral from '../components/teamStats/general';
import TeamScoring from '../components/teamStats/scoring';
import TeamStreaks from '../components/teamStats/streaks';
import TeamRecentScores from '../components/teamStats/recentScores';
import TeamHeadToHead from '../components/teamStats/headToHead';


export default class TeamStats extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onStatsChange = this.onStatsChange.bind(this);
    this.onTeamsChange = this.onTeamsChange.bind(this);
    this.teamId = +this.props.params.teamId;
    this.state = {
      stats: StatsStore.getTeamStats(this.teamId),
      teams: TeamStore.getTeams()
    };
  }

  componentDidMount() {
    StatsStore.addChangeListener(this.onStatsChange);
    StatsActions.loadTeamStats(this.teamId);
    TeamStore.addChangeListener(this.onTeamsChange);
    TeamActions.loadTeams();
  }

  componentWillUnmount() {
    StatsStore.removeChangeListener(this.onStatsChange);
    TeamStore.removeChangeListener(this.onTeamsChange);
  }

  onStatsChange() {
    this.setState({
      stats: StatsStore.getTeamStats(this.teamId),
      h2hStats: StatsStore.getTeamStats(this.state.h2hTeamId),
      h2hMatches: StatsStore.getH2HMatches()
    });
  }

  onTeamsChange() {
    this.setState({ teams: TeamStore.getTeams() });
  }

  getH2HTeams() {
    let thisTeam = _.find(this.state.teams, { id: this.teamId });
    return _.chain(this.state.teams)
      .reject((t) => {
        return t.id === this.teamId || t.players.count !== thisTeam.players.count;
      })
      .sortBy('name')
      .value();
  }

  onH2HTeamSelect(id) {
    this.setState({ h2hTeamId: id});
    StatsActions.loadTeamStats(id);
    StatsActions.loadH2HMatches(this.teamId, id);
  }

  render() {
    let stats = this.state.stats;
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
            teams={this.getH2HTeams()}
            onTeamSelect={this.onH2HTeamSelect.bind(this)}
            h2hStats={this.state.h2hStats}
            h2hMatches={this.state.h2hMatches} />
        </div>
      </div>
    );
  }
}
