import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import movieFetch from "../../adapters/movieFetch";

const styles = theme => ({
  root: {
    maxWidth: "600px",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

function MovieDetailTable(props) {
  const { classes } = props;
  let movie = props.movie;
  return (
    <Paper className={classes.root}>
      <Table>
        <TableBody>
          {movie.runtime && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Movie Runtime
              </TableCell>
              <TableCell>
                {numeral(movie.runtime * 60).format("00:00:00")}
              </TableCell>
            </TableRow>
          )}
          {movie.genres && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Genres
              </TableCell>
              <TableCell>
                {movie.genres
                  .map(item => {
                    return item.name;
                  })
                  .join(", ")}
              </TableCell>
            </TableRow>
          )}
          {movie.release_date && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Release Date
              </TableCell>
              <TableCell>{movie.release_date}</TableCell>
            </TableRow>
          )}
          {movie.status && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Status
              </TableCell>
              <TableCell>{movie.status}</TableCell>
            </TableRow>
          )}
          {movie.budget && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Film Budget
              </TableCell>
              <TableCell>{numeral(movie.budget).format("($ 0 a)")}</TableCell>
            </TableRow>
          )}
          {movie.revenue && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Revenue
              </TableCell>
              <TableCell> {numeral(movie.revenue).format("($ 0 a)")}</TableCell>
            </TableRow>
          )}
          {movie.budget &&
            movie.revenue && (
              <TableRow key="budget">
                <TableCell component="th" scope="row">
                  Net Profits
                </TableCell>
                <TableCell>
                  {numeral(
                    parseInt(movie.revenue, 10) - parseInt(movie.budget, 10)
                  ).format("($ 0 a)")}
                </TableCell>
              </TableRow>
            )}
          {movie.production_companies && (
            <TableRow key="budget">
              <TableCell component="th" scope="row">
                Production Companies
              </TableCell>
              <TableCell>
                {movie.production_companies
                  .map(item => {
                    return item.name;
                  })
                  .join(", ")}
              </TableCell>
            </TableRow>
          )}
          {movie.homepage && (
            <TableRow key="imdb">
              <TableCell component="th" scope="row">
                <a href={movie.imdb_id}>Visit Movie Website</a>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
          {movie.imdb_id && (
            <TableRow key="imdb">
              <TableCell component="th" scope="row">
                <a href={`https://imdb.com/title/${movie.imdb_id}`}>
                  Visit IMDB Page
                </a>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

MovieDetailTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieDetailTable);
