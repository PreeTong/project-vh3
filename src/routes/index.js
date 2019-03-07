import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import NotFoundPage from '../pages/404'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" to="home" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
)