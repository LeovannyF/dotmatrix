import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Link} from 'react-router-dom'
import axios from 'axios'

class Main extends Component {
  render() {
    return(
      <HashRouter>
        <div>
        <Route path='/user/entry' component = {Form} />
        <Route path='/single' component = {Single} />
        </div>
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

class Single extends Component {
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
    .then(content => this.setState({content}))
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

ReactDOM.render(<Main />, document.getElementById('main'))
