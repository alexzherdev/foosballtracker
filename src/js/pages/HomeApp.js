import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import HomeContainer from '../containers/HomeContainer';

const store = configureStore();

export default class HomeApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );
  }
}
