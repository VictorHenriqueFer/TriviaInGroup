import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Settings extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="settings-title">Configuração</h2>
      </div>
    );
  }
}

export default connect()(Settings);
