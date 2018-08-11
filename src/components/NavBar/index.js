import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import TextButton from "../Button";
import styled from "styled-components";
import firebase from "firebase";

const ButtonContainer = styled.div`
  justify-self: flex-end;
  button {
    margin: 0 1rem;
  }
  button:last-child {
    margin-right: 0;
  }
`;

const CustomToolbar = styled(Toolbar)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const Spacer = styled.div`
  height: 100px;
`;

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="fixed" color="default">
        <CustomToolbar>
          <NavLink to="/">
            <Typography variant="display1" color="inherit">
              React Movies
            </Typography>
          </NavLink>
          <ButtonContainer>
            <NavLink to="/search">
              <TextButton size="large">Search</TextButton>
            </NavLink>
            <TextButton size="large">Browse</TextButton>

            {/* consider making one button "sign in / sign up" since firebase auth takes care of both in the same UI. Once signin === true the button can change to logout. */}

            {/* <TextButton variant="outlined" size="large" color="inherit">
              Login
            </TextButton> */}

            {firebase.auth().currentUser ? (
              <NavLink to="/user">
                <TextButton variant="contained" color="secondary" size="large">
                  User Page
                </TextButton>
              </NavLink>
            ) : (
              <NavLink to="/signin">
                <TextButton variant="contained" color="secondary" size="large">
                  Sign In
                </TextButton>
              </NavLink>
            )}
          </ButtonContainer>
        </CustomToolbar>
      </AppBar>
      <Spacer />
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ButtonAppBar;
