import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiSeachToken } from '../Redux/actions';

class GamesQuestion extends Component {
  state = {
    buttonClick: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    const token = localStorage.getItem('token');
    const invalidToken = await dispatch(apiSeachToken(token));
    if (invalidToken) {
      this.logoutAndRedirect();
    }
  }

  logoutAndRedirect = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  suffleQuestion = () => {
    const { question } = this.props;
    const { incorrect_answers: incorrectAnswers } = question[0];
    const correctAnswer = { correct: question[0].correct_answer };
    const allAnswers = incorrectAnswers.concat(correctAnswer);
    const suffleAnswers = this.shuffleArray(allAnswers);
    return suffleAnswers;
  };

  handleButtonClick = () => {
    const { question } = this.props;
    const { selectedAnswer } = this.state;

    const isAnswerCorrect = selectedAnswer === question[0].correctAnswer;

    if (isAnswerCorrect) {
      console.log('Resposta correta!');
    } else {
      console.log('Resposta incorreta!');
    }
    this.setState({ buttonClick: true });
  };

  render() {
    const { question, isTimeUp } = this.props;
    const { buttonClick } = this.state;
    const estiloBotao = {
      border: '3px solid rgb(6, 240, 15)',
    };
    const estiloBotaoRed = {
      border: '3px solid red',
    };
    return (
      <section>
        { question.length > 0 && (
          <div>
            <h1 data-testid="question-category">{question[0].category}</h1>
            <h2 data-testid="question-text">{question[0].question}</h2>
            <div data-testid="answer-options">
              {this.suffleQuestion().map((incorrect, index) => {
                if (incorrect.correct) {
                  return (
                    <button
                      className="button-answer"
                      key={ index }
                      data-testid="correct-answer"
                      onClick={ this.handleButtonClick }
                      style={ buttonClick ? estiloBotao : null }
                      disabled={ isTimeUp }
                    >
                      {incorrect.correct}

                    </button>
                  );
                }
                return (
                  <button
                    className="button-answer"
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.handleButtonClick }
                    style={ buttonClick ? estiloBotaoRed : null }
                    disabled={ isTimeUp }
                  >
                    {incorrect}

                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  question: state.user.data,
  isTimeUp: state.timer.isTimeUp.timeUp,
});

GamesQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isTimeUp: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(GamesQuestion);
