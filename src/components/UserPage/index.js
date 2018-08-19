import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MovieCardRow from "../MovieCardRow";
import TextField from "@material-ui/core/TextField";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const obj = this.props;

    console.log(obj);
  }

  componentDidUpdate() {
    if (!this.state.userMovies) {
      this.setState({
        ...this.state,
        userMovies: Object.values(this.props.reducer.toWatch)
      });
    }
  }

  handleText = e => {
    console.log(Object.values(this.props.reducer.toWatch));

    if (e.target.value !== "" && this.state.userMovies) {
      const filteredMovies = Object.values(this.props.reducer.toWatch).filter(
        movie =>
          movie.title.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
      );

      this.setState({ userMovies: filteredMovies });
    } else {
      this.setState({
        ...this.state,
        userMovies: Object.values(this.props.reducer.toWatch)
      });
    }
  };

  render() {
    console.log(this.state);
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
        {firebase.auth().currentUser ? (
          <div>
            <h2>Hello {firebase.auth().currentUser.displayName}!</h2>
            <h3>Your Movies To Watch:</h3>
            {Object.keys(this.props.reducer.toWatch).length !== 0 ? (
              <React.Fragment>
                <TextField
                  autoFocus
                  id="full-width"
                  label="Search Your Movies By Title"
                  InputLabelProps={{ shrink: true }}
                  onKeyUp={this.handleText}
                  placeholder="Search..."
                  fullWidth
                  margin="normal"
                />

                <MovieCardRow movies={this.state.userMovies} />
              </React.Fragment>
            ) : (
              <p>Add Movies To Your List!</p>
            )}
          </div>
        ) : (
          <Redirect to="/signin" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPage);
