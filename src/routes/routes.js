import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Game from '../pages/Game';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}

export default Routes;
