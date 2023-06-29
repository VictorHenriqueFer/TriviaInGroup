import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import { connect } from 'react-redux';
import { apiSeachToken, buttonSelect, setAssertions, setScore } from '../Redux/actions';

class GamesQuestion extends Component {
  state = {
    buttonClick: false,
    questionIndex: 0,
  };

  async componentDidMount() {
    const { dispatch, history } = this.props;

    const token = localStorage.getItem('token');
    const invalidToken = await dispatch(apiSeachToken(token));
    if (invalidToken) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  shuffleArray = (array) => {
    const parameter = 0.5;
    const shuffledArray = array.sort(() => Math.random() - parameter);
    return shuffledArray;
  };

  suffleQuestion = () => {
    const { question } = this.props;
    const { questionIndex } = this.state;
    if (question.length > 0) {
      const { incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer } = question[questionIndex];
      const correctAnswerobj = { correct: correctAnswer };
      const allAnswers = incorrectAnswers.concat(correctAnswerobj);
      const suffleAnswers = this.shuffleArray(allAnswers);
      return suffleAnswers;
    }
  };

  handleButton = (answer) => {
    const { timer, dispatch, question, score, assertions } = this.props;
    const { questionIndex } = this.state;
    const { difficulty } = question[questionIndex];
    dispatch(buttonSelect(true));
    const ten = 10;
    const three = 3;
    if (answer.correct) {
      if (difficulty === 'easy') {
        dispatch(setScore(ten + (timer * 1)));
        dispatch(setAssertions(assertions + 1));
      } else if (difficulty === 'medium') {
        dispatch(setScore(ten + (timer * 2)));
        dispatch(setAssertions(assertions + 1));
      } else if (difficulty === 'hard') {
        dispatch(setScore(ten + (timer * three)));
        dispatch(setAssertions(assertions + 1));
      } else {
        dispatch(setScore(score));
      }
    }
    this.setState({ buttonClick: true });
  };

  handleNextQuestion = () => {
    const { questionIndex } = this.state;
    const { question } = this.props;
    if (questionIndex < question.length - 1) {
      this.setState((prevState) => ({
        buttonClick: false,
        questionIndex: prevState.questionIndex + 1,
      }));
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const { question, isTimeUp } = this.props;
    const { buttonClick, questionIndex } = this.state;
    const correctAnswer = {
      border: '3px solid rgb(6, 240, 15)',
    };
    const wrongAnswer = {
      border: '3px solid red',
    };

    return (
      <section>
        { question.length > 0 && (
          <div>
            <h1 data-testid="question-category">{question[questionIndex].category}</h1>
            <h2 data-testid="question-text">{question[questionIndex].question}</h2>
            <div data-testid="answer-options">
              { buttonClick ? (
                <button
                  data-testid="btn-next"
                  onClick={ () => this.handleNextQuestion() }
                >
                  Próxima questão
                </button>)
                : '' }
              { this.suffleQuestion().map((answer, index) => {
                if (answer.correct) {
                  return (
                    <button
                      className="button-answer"
                      key={ index }
                      data-testid="correct-answer"
                      onClick={ () => this.handleButton(answer) }
                      style={ buttonClick ? correctAnswer : null }
                      disabled={ isTimeUp || buttonClick }
                    >
                      {answer.correct}

                    </button>
                  );
                }
                return (
                  <button
                    className="button-answer"
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ () => this.handleButton(answer) }
                    style={ buttonClick ? wrongAnswer : null }
                    disabled={ isTimeUp || buttonClick }
                  >
                    {answer}

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
  isTimeUp: state.timer.isTimeUp,
  timer: state.timer.time,
  score: state.player.score,
  assertions: state.player.assertions,
});

GamesQuestion.propTypes = {
  question: PropTypes.arrayOf(shape({})).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  isTimeUp: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(GamesQuestion);
