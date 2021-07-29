import React, { Suspense } from 'react';
import './i18n';
import './App.scss';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Router from './Router';
import NavBar from './components/NavBar';
import Header from './components/Header';
import { PresentationApi } from './utils/Presentation';
import { ROUTES } from './utils/constants';

function createLink(links) {
  return links.map((link) => {
    return (
      <NavLink activeClassName="active" exact key={link.path} to={link.path}>
        {link.name}
      </NavLink>
    );
  });
}

function App() {
  if (typeof PresentationRequest !== 'undefined') {
    window.PRESENTATION = new PresentationApi('/receiver');
    return (
      <div className="app">
        <BrowserRouter>
          <NavBar>{createLink(ROUTES)}</NavBar>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Router />
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div>
      This browser doesn't support Presentation API. Please use Chrome 48+ or
      Edge 79+
    </div>
  );
}

export default App;
