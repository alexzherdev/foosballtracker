import React from 'react';
import _ from 'lodash';

import TeamPicker from '../teamPicker';
import { formatPercentage } from '../utils';


export default class TeamHeadToHead extends React.Component {
  render() {
    const stats = this.props.stats;
    const teamId = stats.team.id;

    let h2h = () => {
      let teamClasses = (attr, direction) => {
        let teamValue = stats.stats[attr];
        let oppValue = this.props.h2hStats.stats[attr];
        let classes;
        if (teamValue > oppValue) {
          classes = ['success', 'danger'];
        } else if (teamValue < oppValue) {
          classes = ['danger', 'success'];
        } else {
          classes = [];
        }
        if (direction === 'desc') {
          classes = _.reverse(classes);
        }
        return classes;
      };

      let h2hGeneral = () => {
        return (
          <tbody>
            <tr>
              <td><strong>Overall</strong></td>
              <td></td>
              <td></td>
            </tr>
            {_.map([['played', 'Played', 'asc'], ['won', 'Won', 'asc'], ['lost', 'Lost', 'desc']], ([attr, label, direction]) => (
              <tr key={attr}>
                <td>{label}</td>
                <td className={teamClasses(attr, direction)[0]}>{stats.stats[attr]}</td>
                <td className={teamClasses(attr, direction)[1]}>{this.props.h2hStats.stats[attr]}</td>
              </tr>
            ))}
            <tr>
              <td>Win rate</td>
              <td className={teamClasses('win_rate', 'asc')[0]}>{formatPercentage(stats.stats.win_rate)}</td>
              <td className={teamClasses('win_rate', 'asc')[1]}>{formatPercentage(this.props.h2hStats.stats.win_rate)}</td>
            </tr>
          </tbody>
        );
      };

      let h2hMatches = () => {
        let body;
        if (this.props.h2hMatches.length) {
          let matches = this.props.h2hMatches;
          let won = _.filter(matches, (m) => m.team1_id === teamId ? m.team1_score > m.team2_score : m.team2_score > m.team1_score).length;
          let lost = matches.length - won;
          let winRate = won / (won + lost);
          let classes = won > lost ? ['success', 'danger'] : ['danger', 'success'];
          body = (
            <tbody>
              <tr>
                <td><strong>Against each other</strong></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Played</td>
                <td>{matches.length}</td>
                <td>{matches.length}</td>
              </tr>
              <tr>
                <td>Won</td>
                <td className={classes[0]}>{won}</td>
                <td className={classes[1]}>{lost}</td>
              </tr>
              <tr>
                <td>Lost</td>
                <td className={classes[0]}>{lost}</td>
                <td className={classes[1]}>{won}</td>
              </tr>
              <tr>
                <td>Win rate</td>
                <td className={classes[0]}>{formatPercentage(winRate)}</td>
                <td className={classes[1]}>{formatPercentage(1 - winRate)}</td>
              </tr>
            </tbody>
          );
        }

        return body;
      };

      return (
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>{this.props.stats.team.name}</th>
              <th>{this.props.h2hStats.team.name}</th>
            </tr>
          </thead>
          { h2hMatches() }
          { h2hGeneral() }
        </table>
      );
    };
    return (
      <div className="panel panel-default h2h">
        <div className="panel-heading">
          <h5 className="panel-title">Head to Head</h5>
        </div>
        <div className="panel-body">
          <TeamPicker teams={this.props.teams} onTeamSelect={this.props.onTeamSelect} />
        </div>

        { this.props.h2hStats ? h2h() : '' }
      </div>
    );
  }
}
