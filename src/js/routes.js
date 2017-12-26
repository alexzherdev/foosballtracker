import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import ScoresContainer from './containers/ScoresContainer';
import HomeContainer from './containers/HomeContainer';
import PlayersContainer from './containers/PlayersContainer';
import StatsContainer from './containers/StatsContainer';
import TeamStatsContainer from './containers/TeamStatsContainer';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="scores" component={ScoresContainer} />
    <Route path="stats">
      <IndexRoute component={StatsContainer} />
      <Route path=":teamId" component={TeamStatsContainer} />
    </Route>
    <Route path="players" component={PlayersContainer} />
  </Route>
);

export default routes;
