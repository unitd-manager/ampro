import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import HeroSliderNineSingle from "../../components/hero-slider/HeroSliderSingle.js";

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow custom-next"
      onClick={onClick}
    >
      →
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow custom-prev"
      onClick={onClick}
    >
      ←
    </div>
  );
};


const HeroSliderNine = ({ spaceLeftClass, spaceRightClass, sliderData }) => {
  const settings = {
    dots: false,
    infinite: true,
 
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Slider {...settings}>
          {sliderData &&
            sliderData.map((single, key) => (
              <HeroSliderNineSingle data={single} key={key} sliderClass="slick-slide" />
            ))}
        </Slider>
      </div>
    </div>
  );
};

HeroSliderNine.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
  sliderData: PropTypes.array.isRequired,
};

export default HeroSliderNine;
