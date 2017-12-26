import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import routes from './routes';
import configureStore from './store/configureStore';

window.jQuery = window.$ = require('jquery');
require('bootstrap');


const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('app')
);
