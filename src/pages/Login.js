import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
  const [nameId, setName] = useState('');
  const [email, setEmail] = useState('');
  const [playDisabled, setPlayDisabled] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setPlayDisabled(newName === '' || email === '');
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setPlayDisabled(nameId === '' || newEmail === '');
  };
  const fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data;
  };

  const handlePlayClick = async () => {
    dispatch(setPlayerName(nameId));
    dispatch(setGravatarEmail(email));
    const tokenData = await fetchToken();
    localStorage.setItem('token', JSON.stringify(tokenData));
    history.push('/game');
  };
  const handleSettingClick = () => {
    history.push('/settings');
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ nameId }
          onChange={ handleNameChange }
          data-testid="input-player-name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={ email }
          onChange={ handleEmailChange }
          data-testid="input-gravatar-email"
        />
      </div>
      <button
        onClick={ handlePlayClick }
        disabled={ playDisabled }
        data-testid="btn-play"
      >
        Play
      </button>
      <button
        data-testid="btn-settings"
        onClick={ handleSettingClick }
      >
        Configuração
      </button>
    </div>
  );
}
export default connect()(Login);
