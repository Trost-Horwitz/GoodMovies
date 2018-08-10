import React from "react";
import NavBar from "../NavBar";
import MovieCardRow from "../MovieCardRow";
import firebase from "firebase";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render(props) {
    return (
      <div>
        <button
          onClick={() => {
            console.log(firebase.auth().currentUser.displayName);
          }}
        >
          WHATS MY NAME
        </button>
        <MovieCardRow movies={this.props.apiData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(HomePage);
