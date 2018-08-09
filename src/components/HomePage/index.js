import React from "react";
import NavBar from "../NavBar";
import MovieCardRow from "../MovieCardRow";
import firebase from 'firebase'
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(props => {
  return (
    <div>
      <MovieCardRow movies={props.apiData} />

      <button onClick={()=>{console.log(firebase.auth().currentUser.displayName)}}>WHATS MY NAME</button>
    </div>
  );
})
