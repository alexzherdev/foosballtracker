import React from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import { loadStatsSummary } from '../actions/statsActions';
import StatsSummary from '../components/statsSummary';


class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStatsSummary();
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <h4>Stats Summary</h4>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#twovtwo" aria-controls="twovtwo" role="tab" data-toggle="tab">2v2</a></li>
          <li role="presentation"><a href="#onevone" aria-controls="onevone" role="tab" data-toggle="tab">1v1</a></li>
          <li role="presentation"><a href="#overall" aria-controls="overall" role="tab" data-toggle="tab">Overall</a></li>
        </ul>
        <div className="tab-content container-fluid">
          <div role="tabpanel" className="tab-pane active" id="twovtwo">
            <StatsSummary stats={this.props.statsSummary && this.props.statsSummary.twovtwo} />
          </div>
          <div role="tabpanel" className="tab-pane" id="onevone">
            <StatsSummary stats={this.props.statsSummary && this.props.statsSummary.onevone} />
          </div>
          <div role="tabpanel" className="tab-pane" id="overall">
            <StatsSummary stats={this.props.statsSummary && this.props.statsSummary.overall} />
          </div>
        </div>

      </div>
    );
  }
}

HomeContainer.propTypes = {
  statsSummary: object,
  loadStatsSummary: func.isRequired
};

function mapStateToProps(state) {
  return {
    statsSummary: state.statsSummary
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadStatsSummary: () => {
      dispatch(loadStatsSummary());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
