import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { playerName, playerEmail, score } = this.props;

    return (
      <header>
        {playerEmail && (
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(playerEmail).toString()}` }
            alt={ playerName }
          />
        )}
        {playerName && <h3 data-testid="header-player-name">{playerName}</h3>}
        <h4>
          Score:
          {' '}
          {score}
        </h4>
        <h4 data-testid="header-score">{score}</h4>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.nameId,
  playerEmail: state.player.email,
  score: state.score,
});

export default connect(mapStateToProps)(Header);
