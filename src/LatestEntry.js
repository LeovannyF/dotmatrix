import React, { Fragment, Component } from 'react';
import Entry from './Entry';
import axios from 'axios';


export default class LatestEntry extends Component {
  constructor() {
    super();
    this.state = {
      latestEntry: {}
    }
  }

  componentDidMount() {
    this.props.socket.on('entry', latestEntry => this.setState({ latestEntry }));
    axios.get('/api/entry')
      .then(response => response.data)
      .then(arr => arr[0]) //should eventually change the server so that it sends an object, not an array
      .then(latestEntry => this.setState({latestEntry}))
  }
  render() {
    const { latestEntry } = this.state;
    return (
      <div>
        { this.state.latestEntry.content ? <Entry entry={this.state.latestEntry} /> : '' }
      </div>
    )
  }
}
