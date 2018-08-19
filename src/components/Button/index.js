import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  border-radius: 4;
  font-size: 1.3rem;
  padding: 0.5rem 1.5rem;
  font-family: Roboto Condensed;
  font-weight: 200;
  letter-spacing: 3pt;
`;

function TextButton(props) {
  return (
    <StyledButton disableRipple {...props}>
      {React.Children.map(props.children, child => child)}
    </StyledButton>
  );
}

TextButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default TextButton;
