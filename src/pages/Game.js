import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import GameQuestion from '../Components/GameQuestion';

class Game extends Component {
  render() {
    return (
      <section>
        <Header />
        <div>
          <GameQuestion />
        </div>
      </section>
    );
  }
}

export default connect()(Game);
