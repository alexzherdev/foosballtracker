import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import StatsContainer from '../containers/StatsContainer';

const store = configureStore();

export default class StatsApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatsContainer />
      </Provider>
    );
  }
}
