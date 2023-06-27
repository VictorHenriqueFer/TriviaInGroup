import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Game from '../pages/Game';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}

export default Routes;
