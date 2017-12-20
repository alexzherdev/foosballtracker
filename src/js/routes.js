import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './pages/app';
import Home from './pages/home';
import Scores from './pages/scores';
import PlayersApp from './pages/PlayersApp';
import Stats from './pages/stats';
import TeamStats from './pages/teamStats';


const routes = ((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="scores" component={Scores} />
      <Route path="stats">
        <IndexRoute component={Stats} />
        <Route path=":teamId" component={TeamStats} />
      </Route>
      <Route path="players" component={PlayersApp} />
    </Route>
  </Router>
));

export default routes;
