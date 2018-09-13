import React, { Component } from 'react';

export default class Entry extends Component {
  render() {
    const { entry } = this.props;
    return (
      <div>
        <div className="quote-container">
          <p className="quote">{ entry.content ? entry.content : ''}</p>
          <p className="author">- { entry.content ? entry.author : ''} | {entry.city}</p>
        </div>
      </div>
    )
  }
}
