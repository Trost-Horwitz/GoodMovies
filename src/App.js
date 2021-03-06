import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import movieFetch from "./adapters/movieFetch";
import theme from "./theme";
import "./App.css";

const store = configureStore();

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    //Example fetch for popular movies -- see adapters/movieFetch.js for all options
    movieFetch.popularMovies().then(json => this.setState({ apiData: json }));

    movieFetch.nowPlayingMovies().then(json => this.setState({ apiDataInTheaters: json }))
    //Example of firebase call using adapter
    // firebaseFetch.getAllUsers().then(console.log);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter {...this.state} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
