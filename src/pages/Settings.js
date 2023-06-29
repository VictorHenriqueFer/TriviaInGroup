import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="settings-title">Configuração</h2>
      </div>
    );
  }
}

export default connect()(Settings);
