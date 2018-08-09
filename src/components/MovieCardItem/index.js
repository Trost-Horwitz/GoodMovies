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
import { addMovieToWatch } from "../../actions/actions";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const handleClickAddMovie = (props)=>{
  const userID = firebase.auth().currentUser.uid
  props.addMovieToWatch(userID, {
    backdrop_path:props.backdrop_path,
    genre_ids:props.genre_ids,
    id:props.id,
    title:props.title,
    poster_path:props.poster_path,
    overview:props.overview,
    popularity:props.popularity,
    release_date:props.release_date, vote_average:props.vote_average
  })
};

function MovieCardItem(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${props.poster_path}`}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.overview.substring(0, 250)}
            {props.overview.length > 250 ? "..." : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Button onClick={()=>handleClickAddMovie(props)}size="small" color="primary">
            Add To Watch List
          </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToWatch: (id, movie) => dispatch(addMovieToWatch(id, movie))
  }
}

const StyledComponent = withStyles(styles)(MovieCardItem);

export default connect(mapStateToProps, mapDispatchToProps)(StyledComponent)
