import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiSeachToken, buttonSelect, setScore } from '../Redux/actions';

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
    const parameter = 0.5;
    const shuffledArray = array.sort(() => Math.random() - parameter);
    return shuffledArray;
  };

  suffleQuestion = () => {
    const { question } = this.props;
    if (question.length > 0) {
      const { incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer } = question[0];
      const correctAnswerobj = { correct: correctAnswer };
      const allAnswers = incorrectAnswers.concat(correctAnswerobj);
      const suffleAnswers = this.shuffleArray(allAnswers);
      return suffleAnswers;
    }
  };

  handleButton = (incorrect) => {
    const { timer, dispatch, question, score } = this.props;
    const { difficulty } = question[0];
    dispatch(buttonSelect(true));

    const ten = 10;
    const three = 3;
    if (incorrect.correct) {
      if (difficulty === 'easy') {
        dispatch(setScore(timer + ten));
      }
      if (difficulty === 'medium') {
        dispatch(setScore(timer + three));
      }
      if (difficulty === 'hard') {
        dispatch(setScore(timer + 1));
      }
    } else {
      dispatch(setScore(score));
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
              { buttonClick ? (
                <button
                  data-testid="btn-next"
                >
                  Próxima questão
                </button>)
                : '' }
              { this.suffleQuestion().map((incorrect, index) => {
                if (incorrect.correct) {
                  return (
                    <button
                      className="button-answer"
                      key={ index }
                      data-testid="correct-answer"
                      onClick={ () => this.handleButton(incorrect) }
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
                    onClick={ () => this.handleButton(incorrect) }
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
  question: state.player.data,
  isTimeUp: state.timer.isTimeUp.timeUp,
  timer: state.timer.time,
  score: state.player.score,
});

GamesQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  score: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  isTimeUp: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(GamesQuestion);
