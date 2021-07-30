import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SettingsProvider } from './context/settingsContext';
const Home = lazy(() => import('./components/Home'));
const Verse = lazy(() => import('./components/Verse'));
const Lyrics = lazy(() => import('./components/Lyrics'));
const Layout = lazy(() => import('./components/Layout'));
const Settings = lazy(() => import('./components/Settings'));
const Receiver = lazy(() => import('./components/Receiver'));

const ROUTES = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/verse',
    component: <Verse />,
  },
  {
    path: '/lyrics',
    component: <Lyrics />,
  },
  {
    path: '/layout',
    component: <Layout />,
  },
  {
    path: '/settings',
    component: <Settings />,
  },
  {
    path: '/receiver',
    component: <Receiver />,
  },
];

function createRoute(routes) {
  return routes.map((route) => {
    return (
      <Route key={route.path} exact path={route.path}>
        <SettingsProvider>{route.component}</SettingsProvider>
      </Route>
    );
  });
}

const Router = () => {
  return <Switch>{createRoute(ROUTES)}</Switch>;
};

export default Router;
