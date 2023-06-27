import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPlayerName, setGravatarEmail } from '../Redux/actions';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  };

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  };

  handlePlayClick = async (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatch(setPlayerName(name));
    dispatch(setGravatarEmail(gravatarEmail));
    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleSettingClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    const minName = 0;
    return (
      <div>
        <h1>Login</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            data-testid="input-player-name"
            type="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />
        </div>
        <button
          onClick={ this.handlePlayClick }
          disabled={ !(name.length > minName && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(gravatarEmail)) }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ this.handleSettingClick }
        >
          Configuração
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
