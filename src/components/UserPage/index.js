import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MovieCardRow from "../MovieCardRow";

class UserPage extends React.Component{
  render(){
    //authDetails has these useful properties:
    // authDetails.additionalUserInfo.isNewUser (boolean)
    // authDetails.user.uid (string)
    // authDetails.user.displayName (string)
    // authDetails.user.email (string)
    // authDetails.user.emailVerified (boolean)
    //  <Redirect to='/user'/>
    // firebase.auth().currentUser
    return (
      <div>
    {firebase.auth().currentUser ?
      <div>
      <h2>Hello {firebase.auth().currentUser.displayName}!</h2>
      <h3>Your Movies To Watch:</h3>
      {Object.keys(this.props.reducer.toWatch).length !== 0 ?
         <MovieCardRow movies={Object.values(this.props.reducer.toWatch)} />
        : <p>Add Movies To Your List!</p>

      }
      </div>


     : <Redirect to='/signin'/>}
    </div>
    );
  }
};



const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPage);
