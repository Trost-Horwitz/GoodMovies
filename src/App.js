import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import movieFetch from './adapters/movieFetch'
import firebaseFetch from './adapters/firebaseFetch'


class App extends Component {

  constructor(){
    super()

    this.state = {
    }
  }

  componentDidMount(){

    //Example fetch for popular movies -- see adapters/movieFetch.js for all options
    movieFetch.popularMovies().then(json=>(this.setState({apiData:json})))

    //Example of firebase call using adapter
    firebaseFetch.getAllUsers().then(console.log)
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {// this renders movie titles on the page as an example
          this.state.apiData && this.state.apiData[0].title ? this.state.apiData.map(mov=>(<h2>{mov.title}</h2>)) : <h2></h2>}
      </div>
    );
  }
}

export default App;
