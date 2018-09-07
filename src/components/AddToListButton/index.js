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

      //update all lower ranked movies with new rank
      // consider moving this to redux
      // may be causing stuttering when removing movies from list, consider a batch update movies function
      for (let movieID in this.props.toWatch){
        if (this.props.toWatch[movieID].rank > props.movie.rank){
          props.startAddMovieToList(uid, {...this.props.toWatch[movieID], rank:parseInt(this.props.toWatch[movieID].rank) -1});
        }
      }
    } else {

      // add rank to movie obj assuming rank=number of movies

      props.startAddMovieToList(uid, {...props.movie, rank:Object.keys(this.props.toWatch).length});
    }
  };

  render() {
    return (
      <div>
        {firebase.auth().currentUser ? (
        <div>
          <Button
            onClick={() => this.handleClick(this.props)}
            variant="outlined"
          >
            {this.props.toWatch[this.props.movie.id] ? "-" : "+"}
          </Button>
          {this.props.toWatch[this.props.movie.id] ? " Remove from list" : " Add to list"}
        </div>
        ) : (
        <div>
          <Link to="/signin" style={{marginRight:'5px'}}>
            <Button variant="outlined">+</Button>
          </Link>
          Add to list
        </div>
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
