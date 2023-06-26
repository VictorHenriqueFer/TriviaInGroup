import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPlayerName, setGravatarEmail } from '../Redux/actions';

class Login extends Component {
  state = {
    email: '',
    isValidEmail: false,
    nameId: '',

  };

  handleChange = ({ target }) => {
    const { email } = this.state;
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.setState(() => ({
        isValidEmail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      })),
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
    const { nameId, email } = this.state;
    dispatch(setPlayerName(nameId));
    dispatch(setGravatarEmail(email));
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
    const { nameId, email, isValidEmail } = this.state;
    const minName = 0;
    return (
      <div>
        <h1>Login</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            data-testid="input-player-name"
            type="name"
            name="nameId"
            value={ nameId }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </div>
        <button
          onClick={ this.handlePlayClick }
          disabled={ !(nameId.length > minName && isValidEmail) }
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
