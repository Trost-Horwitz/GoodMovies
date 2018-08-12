import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MovieDetailTable from "../MovieDetailTable";
import AddToListButton from "../AddToListButton";
import ActorCardRow from "../ActorCardRow";

import movieFetch from "../../adapters/movieFetch";

const BackdropContainer = styled.div`
  background: linear-gradient(to bottom,rgba(27, 50, 27, 0.92), rgba(51, 51, 51, 0.85)),
    url('https://image.tmdb.org/t/p/w1280${props => props.backdrop}');
  background-size: cover;
  height: 100%;
  background-position: 50% 50%;
  display:flex;
  justify-content:center;
`;

const InfoContainer = styled.div`
  position: relative;
  max-width: 90%;
  color: white;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "poster title"
    "poster buttons"
    "poster overview"
    "poster overview";

  .poster {
    grid-area: poster;
  }
  .title {
    grid-area: title;
  }
  .buttons {
    grid-area: buttons;
  }
  .overview {
    grid-area: overview;
  }
`;

class MovieDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movie: {} };
  }

  componentWillMount(props) {
    const id = this.props.match.params.id;
    const movie = movieFetch.movieById(id);
    // movie.then(console.log("MOVIE FROM FETCH ", movie));
    movie.then(movie => this.setState({ movie }));
  }

  render(props) {
    console.log(this.props);
    let movie = this.state.movie;
    return (
      <div>
        <BackdropContainer backdrop={movie.backdrop_path}>
          <InfoContainer>
            <div className="title">
              <h1>{movie.title} </h1>
            </div>
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </div>
            <div className="overview">
              <p>{movie.overview}</p>
            </div>
            {movie.credits && (
              <div className="actor-row">
                <ActorCardRow cast={movie.credits.cast} />
            </div>
            )}
          </InfoContainer>
        </BackdropContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { toWatch: state.reducer.toWatch };
};

export default connect(mapStateToProps)(MovieDetailPage);
