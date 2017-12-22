import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './pages/app';
import ScoresApp from './pages/ScoresApp';
import HomeApp from './pages/HomeApp';
import PlayersApp from './pages/PlayersApp';
import StatsApp from './pages/StatsApp';
import TeamStats from './pages/teamStats';


const routes = ((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeApp} />
      <Route path="scores" component={ScoresApp} />
      <Route path="stats">
        <IndexRoute component={StatsApp} />
        <Route path=":teamId" component={TeamStats} />
      </Route>
      <Route path="players" component={PlayersApp} />
    </Route>
  </Router>
));

export default routes;
