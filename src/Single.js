import React, { Component } from 'react';

export default class Single extends Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
  }
  componentDidMount() {
    axios.get('/api/entry')
      .then(res => res.data)
      .then(data => data[0].content)
      .then(content => this.setState({ content }))
      .catch(console.log.bind(console))
  }
  render() {
    const content = this.state.content;
    return (
      <div>
        <h1>{content}</h1>
      </div>
    )
  }
}