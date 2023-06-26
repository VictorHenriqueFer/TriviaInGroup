import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, nameId, score } = this.props;
    const hash = md5(email).toString();
    const imageGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={imageGravatar}
          alt={nameId}
        />
        <h3 data-testid="header-player-name">{nameId}</h3>
        <h4 data-testid="header-score">
          Score: {score}
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nameId: state.user.nameId,
  score: state.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nameId: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
