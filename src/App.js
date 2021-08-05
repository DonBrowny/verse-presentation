import React, { Suspense } from 'react';
import './i18n';
import './App.scss';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Router from './Router';
import NavBar from './components/NavBar';
import Header from './components/Header';
import { PresentationApi } from './utils/Presentation';
import { ROUTES } from './utils/constants';
import { getFromStorage, saveToStorage } from './utils/utils';
import { PresentationProvider } from './context/PresentationContext';

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

    function setDefaultSettings() {
      const receiverSettings = {
        contentMinSize: 40,
        contentMaxSize: 60,
        contentColor: { r: 255, g: 255, b: 255, a: 1 },
        headerColor: { r: 255, g: 255, b: 255, a: 1 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      };
      saveToStorage('receiverSettings', receiverSettings);
    }

    if (!getFromStorage('receiverSettings')) {
      setDefaultSettings();
    }

    return (
      <div className="app">
        <BrowserRouter>
          <PresentationProvider>
            <NavBar>{createLink(ROUTES)}</NavBar>
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
              <Router />
            </Suspense>
          </PresentationProvider>
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
