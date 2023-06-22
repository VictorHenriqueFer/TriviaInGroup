import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './Redux/store';
import App from './App';
import Login from './pages/Login';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <App />
      <Login />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
