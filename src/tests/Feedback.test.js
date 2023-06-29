import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Feedback', () => {

    it('Deve conter a imagem Trivia', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});
    
			const triviaImg = screen.getByAltText('logo');
			expect(triviaImg).toBeInTheDocument();
    });

    it('Deve conter o texto Feedback', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const loginTitle = screen.getByRole('heading', { level: 1 });
			expect(loginTitle).toHaveTextContent('Feedback');
			expect(loginTitle).toBeInTheDocument();
    });

		it('Verifica se existe a imagem do gravatar', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const gravatarImg = screen.getByTestId('header-profile-picture');
			expect(gravatarImg).toBeInTheDocument();
		});

		it('Verifica se existe o nome do jogador', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const playerName = screen.getByTestId('header-player-name');
			expect(playerName).toBeInTheDocument();
		});
		it('Verifica se existe o score do jogador', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const score = screen.getByTestId('header-score');
			expect(score).toBeInTheDocument();
		});

		it('Verifica se existe o placar total', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const feedbackTotalScore = screen.getByTestId('feedback-total-score');
			expect(feedbackTotalScore).toBeInTheDocument();
		});

		it('Verifica se existe o total de perguntas acertadas', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
			expect(feedbackTotalQuestion).toBeInTheDocument();
		});

		it('Verifica se existe o botao para jogar novamente', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const playAgainButton = screen.getByTestId('btn-play-again');
			expect(playAgainButton).toBeInTheDocument();
			expect(playAgainButton).toHaveTextContent('Play Again');
		});

		it('Verifica se existe o botao de ranking', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});
			const rankingButton = screen.getByTestId('btn-ranking');
			expect(rankingButton).toBeInTheDocument();
			expect(rankingButton).toHaveTextContent('Ranking');
		});

		it('Verifica se ao clicar no botao play again e redirecionado para o /', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});

			const playAgainButton = screen.getByTestId('btn-play-again');
			act(() => {
				userEvent.click(playAgainButton);
			});
			expect(history.location.pathname).toBe('/');
		});
		it('Deve redirecionar para a pagina /ranking ao clicar no botao ranking', () => {
			const { history } = renderWithRouterAndRedux(<App />)

			act(() => {
				history.push('/feedback');
			});
			const rankingButton = screen.getByTestId('btn-ranking');
			act(() => {
				userEvent.click(rankingButton);
			});
			expect(history.location.pathname).toBe('/ranking');
		});
	});