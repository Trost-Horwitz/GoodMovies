import React from "react";
import NavBar from "../NavBar";
import MovieCardRow from "../MovieCardRow";

export default props => {
  return (
    <div>
      <MovieCardRow movies={props.apiData} />
    </div>
  );
};
