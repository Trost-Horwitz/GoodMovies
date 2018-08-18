import React, { Component } from "react";
import styled from "styled-components";
import MovieCardItem from "../MovieCardItem";

const Container = styled.section`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
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
