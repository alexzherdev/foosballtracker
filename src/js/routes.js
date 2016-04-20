import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import App from './pages/app';
import Home from './pages/home';
import New from './pages/new';


const routes = ((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="new" component={New} />
    </Route>
  </Router>
));

export default routes;