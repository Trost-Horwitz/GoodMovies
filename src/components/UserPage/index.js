import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";

class UserPage extends React.Component{
  render(){
    console.log("insideUserPage", this.props)
    return (
      <div>
        {firebase.auth().currentUser && <h1>SO COOL</h1>}
        {firebase.auth().currentUser ? (
          <h1>Welcome, {firebase.auth().currentUser.displayName}!</h1>
        ) : (
          <React.Fragment>
            <p>You need to be signed in to access your user account.</p>
            <p>
              {" "}
              <Link to="/signin">Click here to Sign In</Link>
            </p>
          </React.Fragment>
        )}
      </div>
    );
  }
};



const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPage);
