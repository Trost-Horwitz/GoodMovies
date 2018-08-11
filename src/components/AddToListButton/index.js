import React, { Component } from "react";
import Button from "../Button";
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
      props.startAddMovieToList(uid, props.movie);
    }
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.handleClick(this.props)} variant="outlined">
          {this.props.toWatch[this.props.movie.id] ? "-" : "+"}
        </Button>
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
