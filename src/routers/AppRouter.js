// This file is mainly redux-router and allows for navigation through the components without the need to update too much.
// Using this sort of file we can keep our files small and nice and clean. Getting this done in <30 lines is great.

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import SignInScreen from '../components/FirebaseAuth/SignInScreen'

const AppRouter = props => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={() => <HomePage {...props} />} />
        {/* <Route path="/movie/:id" component={MovieViewPage} /> */}
        {/* <Route path="/login" component={LoginPage} /> */}
        {/* <Route path="/logout" component={LogOut} /> */}
        <Route path='/signin' component={SignInScreen} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
