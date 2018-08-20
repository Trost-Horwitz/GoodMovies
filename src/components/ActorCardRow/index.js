import React from "react";
import styled from "styled-components";
import ActorCardItem from "../ActorCardItem";

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: stretch;
`;

function MovieCardRow(props) {
  return (
    <Container>
      {props.cast &&
        props.cast.slice(0, 6).map(actor => <ActorCardItem actor={actor} />)}
    </Container>
  );
}

export default MovieCardRow;
