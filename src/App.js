import React, { Component } from 'react'
import './App.css'
import { withRouter } from 'react-router-dom'
import Routes from './Routes'

export class App extends Component {
  render () {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default withRouter(App)
