import React from 'react';
import './NavBar.scss';
import Logo from '../logo.png';
import { removeLeadingSlash } from '../utils/utils.js';

const INVISIBLE_ROUTES = ['receiver'];

const NavBar = ({ children }) => {
  const initialLocation = removeLeadingSlash(window.location.pathname);
  const checkVisibility = () => !INVISIBLE_ROUTES.includes(initialLocation);

  return (
    checkVisibility() && (
      <nav className="navbar">
        <a href="/">
          <img className="navbar-logo" src={Logo} alt="Logo" />
          <span className="navbar-name">Verse Presentation</span>
        </a>
        <div className="navbar-links">{children}</div>
      </nav>
    )
  );
};

export default NavBar;
