import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
  constructor() {
    super()
    this.state = {
      author: '',
      city: '',
      content: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div id='container'>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='author'>Name</label>
            <input dmaxLength="60" placeholder="John Dunn" type='text' name='author' value={this.state.author} onChange={this.handleChange} />
            <label htmlFor='city'>Place</label>
            <input maxLength="60" placeholder="Boulder, CO" type='text' name='city' value={this.state.city} onChange={this.handleChange} />
            <label htmlFor='content'>Content</label>
            <br />
            <textarea maxLength="90" placeholder="My t feelings on climate change are..." rows="7" type='text' name='content' value={this.state.content} onChange={this.handleChange} />
            <br />
            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    )
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post('/api/user/entry', this.state)
    this.props.socket.emit('entry', response.data);

    this.setState({
      author: '',
      city: '',
      content: ''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}