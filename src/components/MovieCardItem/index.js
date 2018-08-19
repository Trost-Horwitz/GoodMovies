import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import AddToListButton from "../AddToListButton";
import styled from "styled-components";
import { connect } from "react-redux";

const CardContainer = styled.div`
  display: inline-block;
  padding: 0.5rem 0;
`;

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

function MovieCardItem(props) {
  const { movie, classes } = props;
  return (
    <CardContainer>
      <Card className={classes.card}>
        {/* <Link to={{ pathname: `/movie/${movie.id}` }}> */}
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          title={movie.title}
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
    </CardContainer>
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
