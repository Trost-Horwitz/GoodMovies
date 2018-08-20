import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import AddToListButton from "../AddToListButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const CardContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const CardSlideoutContainer = styled.div`
  width: 550px;
  background-color: #444;
  color: white;
`;

const CardSlideout = props => {
  if (props.selectedItemId === props.movie.id) {
    return (
      <CardSlideoutContainer>
        <h1>{props.movie.title}</h1>
        <p>{props.movie.overview}</p>
        <Link to={`/movie/${props.movie.id}`}>Movie Details</Link>
      </CardSlideoutContainer>
    );
  } else {
    return null;
  }
};

const styles = {
  card: {
    width: 275,
    height: "100%"
  },
  media: {
    height: 0,
    paddingTop: "140%"
  }
};

class MovieCardItem extends React.Component {
  render() {
    const { movie, classes, selectedItemId } = this.props;
    return (
      <CardContainer>
        <Card className={classes.card}>
          {/* <Link to={{ pathname: `/movie/${movie.id}` }}> */}
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            title={movie.title}
            onClick={() => this.props.handleItemClick(movie.id)}
          />
          {/* <CardContent>
            <Typography variant="subheading" component="h6">
              {movie.title}
            </Typography>
          </CardContent> */}
          {/* </Link> */}
          <CardActions>
            <AddToListButton movie={movie} />
          </CardActions>
        </Card>
        <CardSlideout selectedItemId={selectedItemId} movie={movie} />
      </CardContainer>
    );
  }
}

MovieCardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const StyledComponent = withStyles(styles)(MovieCardItem);

export default connect(mapStateToProps)(StyledComponent);
