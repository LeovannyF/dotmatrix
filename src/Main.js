import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom'
import LatestEntry from './LatestEntry';
import Form from './Form';
import Single from './Single';

const socket = io(window.location.path);

export default class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/' render={() => <LatestEntry socket={socket} />} />
          <Route path='/user/entry' render={() => <Form socket={socket} />} />
          <Route path='/single' component={Single} />
        </div>
      </HashRouter>
    )
  }
}