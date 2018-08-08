import React from "react";
import NavBar from "../NavBar";
import MovieCardRow from "../MovieCardRow";
import firebase from 'firebase'

export default props => {
  return (
    <div>
      <MovieCardRow movies={props.apiData} />

      <button onClick={()=>{console.log(firebase.auth().currentUser.displayName)}}>WHATS MY NAME</button>
    </div>
  );
};
