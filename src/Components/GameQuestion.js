import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamesQuestion extends Component {
  state = {
    question: [],
  };

  fetchQuestion = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) return history.push('/login');
    try {
      const number = 3;
      const response = await fetch(`https://opentdb.com/api.php?amount=1&token=${token}`);
      const data = await response.json();
      const { results } = data;
      if (data.response_code === number) {
        this.logoutAndRedirect();
      } if (data.results.length > 0) {
        this.setState({ question: results });
      }
    } catch (error) {
      console.log('Erro ao obter pergunta:', error);
      this.logoutAndRedirect();
    }
  };

  logoutAndRedirect = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    const { question } = this.state;
    return (
      <section>
        <button
          type="button"
          onClick={ this.fetchQuestion }
        >
          INICIAR O JOGO
        </button>
        {question.map((item) => (
          <div key={ item.question }>
            <h1 data-testid="question-category">{ item.category }</h1>
            <h2 data-testid="question-text">{ item.question }</h2>
            <h3 data-testid="correct-answer">{ item.correct_answer }</h3>
            <h3 data-testid="wrong-answer">{ item.incorrect_answers }</h3>
          </div>
        ))}
      </section>
    );
  }
}
GamesQuestion.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(GamesQuestion);
