import React, { Component } from 'react';
import './App.css';

// import logger from 'redux-logger'
// import { createStore } from 'redux'
// import reducer from './reducer'

import Routing from './routes'
import withNavbar from '../src/hdc/withNavbar'

// import store from './store/TodoStore'


class App extends Component {
  
  render() {
    return (
      <Routing  />
    );
  }
}

export default withNavbar(App);
