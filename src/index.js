import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Link} from 'react-router-dom'
import axios from 'axios'

class Main extends Component {
  render() {
    return(
      <HashRouter>
        <Route path='/user/entry' component = {Form} />
      </HashRouter>
    )
  }
}

class Form extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      city: '',
      content: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  render() {
    return (
      <div id='container'>
      <form onSubmit = {this.handleSubmit}>
        <label htmlFor= 'name'> Author</label>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
        <label htmlFor= 'city'> Place </label>
        <input type='text' name='city' value={this.state.city} onChange={this.handleChange} />
        <label htmlFor= 'content'> Content </label>
        <input type='text' name='content' value={this.state.content} onChange={this.handleChange} />
        <button type='submit'> Submit </button>
      </form>
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/user/entry', this.state)
    this.setState({
      name:'',
      city:'',
      content:''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
}

ReactDOM.render(<Main />, document.getElementById('main'))
