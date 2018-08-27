import React, { Component } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase";
import {
  startAddMovieToList,
  startRemoveMovieFromList
} from "../../actions/actions";

class AddToListButton extends Component {
  constructor(props) {
    super(props);
    this.state = { addText: true };
  }

  handleClick = props => {
    const uid = firebase.auth().currentUser.uid;
    if (this.props.toWatch[this.props.movie.id]) {
      props.startRemoveMovieFromList(uid, props.movie);
    } else {

      // add rank to movie obj assuming rank=number of movies
      console.log("adding movie to list from button", props.movie)
      console.log("222adding movie to list from button", Object.keys(this.props.toWatch).length)

      props.startAddMovieToList(uid, {...props.movie, rank:Object.keys(this.props.toWatch).length});
    }
  };

  render() {
    return (
      <div>
        {firebase.auth().currentUser ? (
          <Button
            onClick={() => this.handleClick(this.props)}
            variant="outlined"
          >
            {this.props.toWatch[this.props.movie.id] ? "-" : "+"}
          </Button>
        ) : (
          <Link to="/signin">
            <Button variant="outlined">+</Button>
          </Link>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state, toWatch: state.reducer.toWatch };
};

const mapDispatchToProps = dispatch => {
  return {
    startAddMovieToList: (id, movie) =>
      dispatch(startAddMovieToList(id, movie)),
    startRemoveMovieFromList: (id, movie) =>
      dispatch(startRemoveMovieFromList(id, movie))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToListButton);
