import React from 'react';
import { Provider } from 'react-redux';
import { object } from 'prop-types';

import configureStore from '../store/configureStore';
import TeamStatsContainer from '../containers/TeamStatsContainer';

const store = configureStore();


export default class TeamStatsApp extends React.Component {
  static propTypes = {
    params: object.isRequired
  };

  render() {
    return (
      <Provider store={store}>
        <TeamStatsContainer teamId={+this.props.params.teamId} />
      </Provider>
    );
  }
}
