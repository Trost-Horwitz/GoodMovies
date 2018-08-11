import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "../Button";
import AddToListButton from "../AddToListButton";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

function MovieCardItem(props) {
  const { movie, classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent>
          <Link to={{ pathname: `/movie/${movie.id}` }}>
            <Typography gutterBottom variant="headline" component="h2">
              {movie.title}
            </Typography>
          </Link>
          <Typography component="p">
            {movie.overview.substring(0, 250)}
            {movie.overview.length > 250 ? "..." : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={{ pathname: `/movie/${movie.id}` }}>
            <Button size="small" color="primary">
              View Details
            </Button>
          </Link>
          {firebase.auth().currentUser ? (
            <AddToListButton movie={movie} />
          ) : (
            <Link to="/signin">
              <Button size="small" color="primary">
                Login & Add To Watch List
              </Button>
            </Link>
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

const StyledComponent = withStyles(styles)(MovieCardItem);

export default connect(mapStateToProps)(StyledComponent);
