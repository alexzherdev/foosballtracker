import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import PlayersContainer from '../containers/PlayersContainer';

const store = configureStore();

export default class PlayersApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PlayersContainer />
      </Provider>
    );
  }
}
