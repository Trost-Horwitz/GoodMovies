import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "../Button";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase";
import { connect } from "react-redux";
import { startAddMovieToList } from "../../actions/actions";
import { startRemoveMovieFromList } from "../../actions/actions";
import { NavLink } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const handleClickAddMovie = props => {
  const userID = firebase.auth().currentUser.uid;
  props.startAddMovieToList(userID, props.movie);
};

const handleClickRemoveMovie = props => {
  const userID = firebase.auth().currentUser.uid;
  props.startRemoveMovieFromList(userID, props.movie);
};

function MovieCardItem(props) {
  const { movie, classes } = props;
  const { toWatch } =  props.reducer;
  console.log("inside card",Object.keys(toWatch), movie.id.toString())
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {movie.title}
          </Typography>
          <Typography component="p">
            {movie.overview.substring(0, 250)}
            {movie.overview.length > 250 ? "..." : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View Details
          </Button>

          {/* {Nested IF else here: if authenticated -> "add to list", if not authenticated -> redirect to login, if authenicated and in list -> remove from list } */}

          {firebase.auth().currentUser ?

            Object.keys(toWatch).includes(movie.id.toString()) ?

            (
            <Button
              onClick={() => handleClickRemoveMovie(props)}
              size="small"
              color="primary"
            >
              Remove from Watch List
            </Button>
          )
          :
            (
            <Button
              onClick={() => handleClickAddMovie(props)}
              size="small"
              color="primary"
            >
              Add To Watch List
            </Button>
          )



          : (
            <NavLink to="/signin">
              <Button size="small" color="primary">
                Login & Add To Watch List
              </Button>
            </NavLink>
          )}


        </CardActions>
      </Card>
    </div>
  );
}

MovieCardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    startAddMovieToList: (id, movie) => dispatch(startAddMovieToList(id, movie)),
    startRemoveMovieFromList: (id, movie) => dispatch(startRemoveMovieFromList(id, movie))
  };
};

const StyledComponent = withStyles(styles)(MovieCardItem);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);
