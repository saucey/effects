import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import MediaLogin from './pages/signup/mediaLogin'
import CreateMedia from './pages/createMedia/index'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/media-login" exact component={MediaLogin} />
      <Route path="/create-media" exact component={CreateMedia} />
      <Route path="/" exact component={() => {
        alert('here')
      }} />
    </Switch>
  </BrowserRouter>
)
