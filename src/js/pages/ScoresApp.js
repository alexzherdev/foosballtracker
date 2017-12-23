import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import ScoresContainer from '../containers/ScoresContainer';

const store = configureStore();

export default class ScoresApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ScoresContainer />
      </Provider>
    );
  }
}
