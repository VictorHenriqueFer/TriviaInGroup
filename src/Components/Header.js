import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    const imageGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ imageGravatar }
          alt={ name }
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h4 data-testid="header-score">
          Score:
          {' '}
          {score}
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
