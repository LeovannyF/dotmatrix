import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LatestEntry from './LatestEntry'
import {HashRouter, Route, Link} from 'react-router-dom'
import axios from 'axios'

const socket = io(window.location.path);

class Main extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path='/' render={ () => <LatestEntry socket={socket} /> } />
          <Route path='/user/entry' render={ () => <Form socket={socket} /> } />
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
          <form onSubmit = {this.handleSubmit}>
            <label htmlFor= 'author'>Name</label>
            <input placeholder="John Dunn" type='text' name='author' value={this.state.author} onChange={this.handleChange}/>
            <label htmlFor= 'city'>Place</label>
            <input placeholder="Boulder, CO" type='text' name='city' value={this.state.city} onChange={this.handleChange} />
            <label  htmlFor= 'content'>Content</label>
            <br />
            <textarea placeholder="My feelings on climate change are..." rows="7" type='text' name='content' value={this.state.content} onChange={this.handleChange} />
            <br />
            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    )
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state, 'WOO');
    await axios.post('/api/user/entry', this.state)
    socket.emit('entry', this.state)

    this.setState({
      author:'',
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
