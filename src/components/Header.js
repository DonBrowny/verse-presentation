import React from 'react';
import './Header.scss';
import Logo from '../logo.png';

const Header = ({ children }) => {
  return (
    <nav className="header">
      <a href="/">
        <img className="header-logo" src={Logo} alt="Logo" />
        <span className="header-name">Verse Presentation</span>
      </a>
      <div className="header-links">{children}</div>
    </nav>
  );
};

export default Header;
