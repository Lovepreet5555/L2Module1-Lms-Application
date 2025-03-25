import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './app/App';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={LoginPage} />
    </Switch>
  </Router>
);

export default Routes;
