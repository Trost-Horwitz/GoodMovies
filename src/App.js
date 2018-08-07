import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import NavBar from "./components/NavBar";
import MovieCardRow from "./components/MovieCardRow";

import movieFetch from "./adapters/movieFetch";
import theme from "./theme";
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    //Example fetch for popular movies -- see adapters/movieFetch.js for all options
    movieFetch.popularMovies().then(json => this.setState({ apiData: json }));
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
          <MovieCardRow movies={this.state.apiData} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
