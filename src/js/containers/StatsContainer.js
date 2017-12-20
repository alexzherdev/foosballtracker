import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import StatsDetails from '../components/statsDetails';
import { loadStats } from '../actions/statsActions';


class StatsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStats();
  }

  render() {
    return (
      <div className="stats">
        <div className="container-fluid">
          <h4>Stats</h4>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#twovtwo" aria-controls="twovtwo" role="tab" data-toggle="tab">2v2</a></li>
          <li role="presentation"><a href="#onevone" aria-controls="onevone" role="tab" data-toggle="tab">1v1</a></li>
        </ul>
        <div className="tab-content container-fluid">
          <div role="tabpanel" className="tab-pane active" id="twovtwo">
            <StatsDetails stats={this.props.stats && this.props.stats.twovtwo} />
          </div>
          <div role="tabpanel" className="tab-pane" id="onevone">
            <StatsDetails stats={this.props.stats && this.props.stats.onevone} />
          </div>
        </div>

      </div>
    );
  }
}

StatsContainer.propTypes = {
  stats: object,
  loadStats: func.isRequired
};

function mapStateToProps(state) {
  return {
    stats: state.stats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadStats: () => {
      dispatch(loadStats());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
