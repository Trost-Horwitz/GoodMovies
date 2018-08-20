import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = {
  card: {
    width: 200,
    height: "100%"
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  },
  character: {
    fontSize: ".8rem",
    textTransform: "uppercase",
    color: "#777"
  }
};

function ActorCardItem(props) {
  const { actor, classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          title={actor.title}
        />
        <CardContent>
          {/* <Link to={{ pathname: `/actor/${actor.id}` }}> */}
          <Typography>{actor.name}</Typography>
          {/* </Link> */}
          <Typography component="p" className={classes.character}>
            {actor.character}
          </Typography>
        </CardContent>
        <CardActions />
      </Card>
    </div>
  );
}

ActorCardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const StyledComponent = withStyles(styles)(ActorCardItem);

export default connect(mapStateToProps)(StyledComponent);
