import React from 'react';
import './NavBar.scss';
import Logo from '../logo.png';

const NavBar = ({ children }) => {
  return (
    <nav className="navbar">
      <a href="/">
        <img className="navbar-logo" src={Logo} alt="Logo" />
        <span className="navbar-name">Verse Presentation</span>
      </a>
      <div className="navbar-links">{children}</div>
    </nav>
  );
};

export default NavBar;
