import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  handlePlayClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  };

  handleRankingClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <div>
          <header>
            <Header />
          </header>
          {assertions < three ? <h3 data-testid="feedback-text">Could be better...</h3>
            : <h3 data-testid="feedback-text">Well Done!</h3>}
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayClick }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleRankingClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
