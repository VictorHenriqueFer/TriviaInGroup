import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPlayerName, setGravatarEmail } from '../Redux/actions';
import { getToken } from '../services/apiRequest';

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

  handlePlayClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatch(setPlayerName(name));
    dispatch(setGravatarEmail(gravatarEmail));
    const token = await getToken();
    localStorage.setItem('token', token.token);
    history.push('/game');
  };

  handleSettingClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    const minName = 0;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            Name:
            <input
              id="name"
              data-testid="input-player-name"
              type="name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              name="gravatarEmail"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
          </label>
        </form>
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
