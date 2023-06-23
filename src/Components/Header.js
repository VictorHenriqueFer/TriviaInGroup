import React from 'react';
import md5 from 'crypto-js/md5';
import { useSelector } from 'react-redux';

function Header() {
  const { nameId } = useSelector((state) => state.player);
  return (
    <header>
      {nameemail && (
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(nameemail).toString()}` }
          alt={ nameId }
        />
      )}
      {nameId && <h3 data-testid="header-player-name">{nameId}</h3>}
      <h4>
        Score:
        {' '}
        {headerscore}
      </h4>
      <h4 data-testid="header-score">
        {headerscore}
      </h4>
    </header>
  );
}

export default Header;
