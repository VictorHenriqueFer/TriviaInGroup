import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

function Routes() {
  return (
    <Router>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
    </Router>
  );
}

export default Routes;
