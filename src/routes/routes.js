import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../pages/Login';

function Routes() {
  return (
    <Router>
      <Route exact path="/" component={ Login } />
    </Router>
  );
}

export default Routes;
