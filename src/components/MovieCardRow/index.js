import React, { Component } from "react";
import styled from "styled-components";
import MovieCardItem from "../MovieCardItem";

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

function MovieCardRow(props) {
  return (
    <Container>
      {props.movies &&
        props.movies.map(movie => <MovieCardItem movie={movie} />)}
    </Container>
  );
}

export default MovieCardRow;
