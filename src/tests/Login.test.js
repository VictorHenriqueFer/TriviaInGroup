import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Redux/reducers';
import Login from '../pages/Login';
import { setPlayerName, setGravatarEmail } from '../Redux/actions';

const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe('Login', () => {
  it('deve renderizar corretamente os elementos', () => {
    renderWithRedux(<Login />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });

  it('deve desabilitar o botão de jogar caso o email e o nome do jogador não estejam preenchidos', () => {
    renderWithRedux(<Login />);

    const playButton = screen.getByTestId('btn-play');
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    expect(playButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'Bruno Lindo' } });
    expect(playButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'dgkkcs@example.com' } });
    expect(playButton).toBeEnabled();
  });

  it('deve redirecionar para a tela de configurações ao clicar no botão de configurações', () => {
    const history = createMemoryHistory();
    renderWithRedux(<Login />, { history });

    const settingsButton = screen.getByTestId('btn-settings');
    fireEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  });

  it('deve redirecionar para a tela de jogo ao clicar no botão de jogar', async () => {
    const history = createMemoryHistory();
    renderWithRedux(<Login />, { history });

    const playButton = screen.getByTestId('btn-play');
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    fireEvent.change(nameInput, { target: { value: 'Segue eu na Twitch' } });
    fireEvent.change(emailInput, { target: { value: 'dgkkcs@example.com' } });

    const token = 'mock-token';
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token }),
    });

    fireEvent.click(playButton);

    expect(history.location.pathname).toBe('/game');
    expect(localStorage.getItem('token')).toBe(token);
    expect(screen.getByTestId('input-player-name').value).toBe('');
    expect(screen.getByTestId('input-gravatar-email').value).toBe('');
  });


});
