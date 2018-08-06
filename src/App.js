import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// require('dotenv').config()

class App extends Component {

  constructor(){
    super()

    this.state = {
      apiData : {}
    }
  }

  getPopular = () =>{
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`

    fetch(url).then(resp=>resp.json()).then(json=>(this.setState({apiData:json})))
  }

  componentDidMount(){
    this.getPopular()
  }

  render() {
    console.log(this.state.apiData.results)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.apiData.results ? this.state.apiData.results.map(mov=>(<h2>{mov.title}</h2>)) : null}
      </div>
    );
  }
}

export default App;
