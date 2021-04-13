import React, { Suspense } from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './Router';

const ROUTES = [
  {
    path: '/',
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
      <Link key={link.path} to={link.path}>
        {link.name}
      </Link>
    );
  });
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <header className="app-header">{createLink(ROUTES)}</header>
        <div className="app-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
