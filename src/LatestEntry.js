import React, { Fragment, Component } from 'react';
import axios from 'axios';

export default class LatestEntry extends Component {
  constructor() {
    super();
    this.state = {
      latestEntry: {}
    }
  }

  componentDidMount() { axios.get('/api/entry')
      .then(response => response.data)
      .then(arr => arr[0]) //should eventually change the server so that it sends an object, not an array
      .then(latestEntry => this.setState({latestEntry}))
  }
  render() {
    const { latestEntry } = this.state;
    return (
      <div className="quote-container">
        <p className="quote">{ latestEntry.content ? latestEntry.content : ''}</p>
      </div>
    )
  }
}
