import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
const Verse = lazy(() => import('./components/Verse'));
const Lyrics = lazy(() => import('./components/Lyrics'));
const Layout = lazy(() => import('./components/Layout'));
const Settings = lazy(() => import('./components/Settings'));

const ROUTES = [
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
];

function createRoute(routes) {
  return routes.map((route) => {
    return (
      <Route key={route.path} exact path={route.path}>
        {route.component}
      </Route>
    );
  });
}

const Router = () => {
  return <Switch>{createRoute(ROUTES)}</Switch>;
};

export default Router;
