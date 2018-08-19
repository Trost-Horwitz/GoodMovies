// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { connect } from "react-redux";
import { signin } from "../../actions/auth";
import { startGetUserData } from "../../actions/actions";
import { Redirect } from "react-router-dom";

class SignInScreen extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    // We will display Google and Email as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: authDetails => {
        this.props.dispatch(signin(authDetails));
        this.props.dispatch(startGetUserData(authDetails));
        return false;
      }
    }
  };
  //authDetails has these useful properties:
  // authDetails.additionalUserInfo.isNewUser (boolean)
  // authDetails.user.uid (string)
  // authDetails.user.displayName (string)
  // authDetails.user.email (string)
  // authDetails.user.emailVerified (boolean)

  render(props) {
    return (
      <div>
        {this.props.auth && this.props.auth.uid ? (
          <Redirect to="/user" />
        ) : null}
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(SignInScreen);
