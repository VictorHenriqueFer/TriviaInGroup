import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import GameQuestion from '../Components/GameQuestion';
import Timer from '../Components/Timer';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <Header />
        <div>
          <Timer />
          <GameQuestion history={ history } />
        </div>
      </section>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
