import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Configuração from '../pages/Configuração';

function Routes() {
  return (
    <Router>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Configuração } />
    </Router>
  );
}

export default Routes;
