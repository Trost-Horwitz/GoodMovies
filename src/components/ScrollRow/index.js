import React, { Component } from "react";
// import "./slick-theme.css";
import "./slick.css";
import Slider from "react-slick";
import styled from "styled-components";
import MovieCardItem from "../MovieCardItem";
import arrowIcon from "./arrow.svg";

const ArrowContainer = styled.div`
  appearance: none;
  background: transparent;
  padding: 0;
  border: 0;

  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const Arrow = styled.div`
  display: flex;
  align-self: center;
  // background-color: rgba(255, 255, 255, 0.4);
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
	padding: 10px 10px;

`;


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer
      className={className}
      style={{ ...style, right: 0, display: "flex" }}
    >
      <Arrow onClick={onClick}>
        <img src={arrowIcon}  style={{width: "50px", height:"50px"}}/>
      </Arrow>
    </ArrowContainer>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer
      className={className}
      style={{
        ...style,

        left: 0,
        display: "flex"
      }}
    >
      <Arrow onClick={onClick}>
			<img src={arrowIcon}  style={{width: "40px", height:"40px",   transform: "rotate(180deg)", opacity:".8"}}/>
			
			</Arrow>
    </ArrowContainer>
  );
}

const Container = styled.div``;

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const settings = {
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true,
      swipeToSlide: true,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <Container>
        <Slider {...settings}>
          {this.props.movies &&
            this.props.movies.map(movie => (
              <MovieCardItem
                movie={movie}
                selectedItemId={this.state.selectedItemId}
              />
            ))}
        </Slider>
      </Container>
    );
  }
}
