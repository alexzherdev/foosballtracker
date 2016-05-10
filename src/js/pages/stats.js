import React from 'react';

import StatsStore from '../stores/statsStore';
import StatsActions from '../actions/statsActions';
import StatsDetails from '../components/statsDetails';


export default class Stats extends React.Component {
  state = {
    stats: StatsStore.getDetails()
  };

  constructor(props) {
    super(props);
    this.onStatsChange = this.onStatsChange.bind(this);
  }

  componentDidMount() {
    StatsStore.addChangeListener(this.onStatsChange);
    StatsActions.loadStats();
  }

  componentWillUnmount() {
    StatsStore.removeChangeListener(this.onStatsChange);
  }

  onStatsChange() {
    this.setState({ stats: StatsStore.getDetails() });
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <h4>Stats</h4>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#twovtwo" aria-controls="twovtwo" role="tab" data-toggle="tab">2v2</a></li>
          <li role="presentation"><a href="#onevone" aria-controls="onevone" role="tab" data-toggle="tab">1v1</a></li>
        </ul>
        <div className="tab-content container-fluid">
          <div role="tabpanel" className="tab-pane active" id="twovtwo">
            <StatsDetails stats={this.state.stats && this.state.stats.twovtwo} />
          </div>
          <div role="tabpanel" className="tab-pane" id="onevone">
            <StatsDetails stats={this.state.stats && this.state.stats.onevone} />
          </div>
        </div>

      </div>
    );
  }
}
