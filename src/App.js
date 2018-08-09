import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import movieFetch from "./adapters/movieFetch";
import firebaseFetch from "./adapters/firebaseFetch";
import theme from "./theme";

import SignInScreen from "./components/FirebaseAuth/SignInScreen";

const store = configureStore();

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    //Example fetch for popular movies -- see adapters/movieFetch.js for all options
    movieFetch.popularMovies().then(json => this.setState({ apiData: json }));

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
