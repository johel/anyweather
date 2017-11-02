import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './scenes/Home/index.js';

const componentRoutes = {
  component: Home,
  path: '/'
  // indexRoute: { component: IndexComponent }
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
