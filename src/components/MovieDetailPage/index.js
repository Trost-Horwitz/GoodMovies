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
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;

  .poster {
    grid-column: 1 / 1;
    grid-row: 1 / 5;
    display: flex;
    justify-content: flex-end;
    place-items: start start;
    img {
      max-width: 500px;
      width: 100%
    }
  }
  .title {
    place-self: start start;
    grid-column: 2 / 2;
    grid-row: 1/1;
    h1{
      margin:0;
    }
  }
  .buttons {
    display: flex;
    flex-flow row wrap;
    grid-column: 2 / 2;
    grid-row: 2/2;
  }
  .overview {
    font-weight: 300;
    grid-column: 2 / 2;
    grid-row: 3/3;
  }
  .detail-table {
    grid-column: 2 / 3;
    grid-row: 4/4;
  }
  .actor-row {
    grid-column 1/3;
    grid-row 5/5;
  }


  @media all and (max-width:800px) { 
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;

  .poster {
    grid-column: 1/1;
    grid-row: 2/3;
  }
    .title {
      grid-column: 1/3;
      grid-row: 1/1;
    }
    .buttons {
      display: flex;
      flex-flow column wrap;
      grid-row: 2/3;
  
      grid-column: 2 / 2;
    }
    .overview {
      font-weight: 300;
      grid-row: 4/4;
      grid-column: 1 / 3;
    }
    .detail-table {
      grid-row: 5/5;
      grid-column: 1 / 3;
    }
    .actor-row {
      grid-column 1/3;
      grid-row 6/6;
    }

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
            <div className="buttons">
              <AddToListButton movie={movie} />
              <p>
                User Score <span>{movie.vote_average * 10}</span>
                <span>%</span>
              </p>
            </div>
            <div className="overview">
              <p>{movie.overview}</p>
            </div>
            <div className="detail-table">
              <MovieDetailTable movie={movie} />
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
