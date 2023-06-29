import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Login', () => {
  it('deve renderizar corretamente os elementos', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => {
      history.push('/');
    });

    const triviaImg = screen.getByAltText('logo');
    expect(triviaImg).toBeInTheDocument();

    const loginTitle = screen.getByRole('heading', { level: 1 });
    expect(loginTitle).toHaveTextContent('Login');
    expect(loginTitle).toBeInTheDocument();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveTextContent('Play');
    expect(playButton).toBeDisabled();

    const configButton = screen.getByTestId('btn-settings');
    expect(configButton).toBeInTheDocument();
    expect(configButton).toHaveTextContent('Configuração');
    expect(configButton).toBeEnabled();
  });

  it('deve desabilitar o botão de jogar caso o email e o nome do jogador não estejam preenchidos', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => {
      history.push('/');
    });

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.paste(inputName, '');
      userEvent.paste(inputEmail, '');
    });

    expect(playButton).toBeDisabled();
  });

  it('deve habilitar o botão de jogar caso o email e o nome do jogador estejam preenchidos', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => {
      history.push('/');
    });

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.paste(inputName, 'teste');
      userEvent.paste(inputEmail, 'teste@teste.com');
    });

    expect(playButton).toBeEnabled();
  });

  it('Verifica se e redirecionado para a pagina de configuracoes quando clicar no botao configuracoes', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const configButton = screen.getByTestId('btn-settings');
    expect(configButton).toBeInTheDocument();
    expect(configButton).toHaveTextContent('Configuração');
    expect(configButton).toBeEnabled();

    act(() => {
      userEvent.click(configButton);
    })
    expect(history.location.pathname).toBe('/settings');
  });

  it('Verifica se e redirecionado para a pagina de jogo quando clicar no botao jogar', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveTextContent('Play');
    expect(playButton).toBeDisabled();

    act(() => {
      userEvent.paste(inputName, 'teste');
      userEvent.paste(inputEmail, 'teste@teste.com');
      userEvent.click(playButton);
    });

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  })

});
