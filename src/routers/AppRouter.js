import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import SignInScreen from "../components/FirebaseAuth/SignInScreen";
import UserPage from "../components/UserPage";
import Search from "../components/Search";
import MovieDetailPage from "../components/MovieDetailPage";

const AppRouter = props => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={() => <HomePage {...props} />} />
        <Route path="/movie/:id" component={MovieDetailPage} />
        <Route path="/search" component={Search} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/user" component={UserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
