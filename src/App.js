import React, { Suspense } from 'react';
import './i18n';
import './App.scss';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Router from './Router';
import Header from './components/Header';
import ContentHeader from './components/ContentHeader';

const ROUTES = [
  {
    path: '/verse',
    name: 'Verse',
  },
  {
    path: '/lyrics',
    name: 'Lyrics',
  },
  {
    path: '/layout',
    name: 'Layout',
  },
  {
    path: '/settings',
    name: 'Settings',
  },
];

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
  return (
    <div className="app">
      <BrowserRouter>
        <Header>{createLink(ROUTES)}</Header>
        <div className="app-content">
          <ContentHeader />
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
