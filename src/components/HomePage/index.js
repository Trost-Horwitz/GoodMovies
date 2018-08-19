import React from "react";
import ScrollRow from "../ScrollRow";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render(props) {
    return (
      <div>
        <h4 style={{ marginBottom: "8px", lineHeight: 0 }}>Popular Movies</h4>
        <ScrollRow movies={this.props.apiData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(HomePage);
