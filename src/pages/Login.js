import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
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
    setPlayDisabled(name === '' || newEmail === '');
  };

  const handlePlayClick = () => {
    dispatch(setPlayerName(name));
    dispatch(setGravatarEmail(email));
    history.push('/game');
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ name }
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
    </div>
  );
}

export default Login;
