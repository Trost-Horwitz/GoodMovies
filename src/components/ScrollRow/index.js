import React, { Component } from "react";
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
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
  padding: 10px 10px;
`;

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer
      className={className}
      style={{ ...style, right: 0, display: "flex" }}
    >
      <Arrow onClick={onClick}>
        <img src={arrowIcon} style={{ width: "50px", height: "50px" }} />
      </Arrow>
    </ArrowContainer>
  );
}

function PrevArrow(props) {
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
        <img
          src={arrowIcon}
          style={{
            width: "50px",
            height: "50px",
            transform: "rotate(180deg)"
          }}
        />
      </Arrow>
    </ArrowContainer>
  );
}

export default class ScrollRow extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = { width: window.innerWidth, selectedItemId: "" };
  }

  handleItemClick = id => {
    if (this.state.selectedItemId === id) {
      this.setState({ selectedItemId: "" });
    } else {
      this.setState({ selectedItemId: id });
    }
  };

  render() {
    const settings = {
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true,
      swipeToSlide: true,
      slidesToScroll: Math.floor(this.state.width / 275),
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.movies &&
            this.props.movies.map(movie => (
              <MovieCardItem
                movie={movie}
                selectedItemId={this.state.selectedItemId}
                handleItemClick={this.handleItemClick}
              />
            ))}
        </Slider>
      </div>
    );
  }
}
