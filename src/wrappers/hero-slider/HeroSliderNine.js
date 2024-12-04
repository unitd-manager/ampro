import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import HeroSliderNineSingle from "../../components/hero-slider/HeroSliderSingle.js";

const HeroSliderNine = ({ spaceLeftClass, spaceRightClass,sliderData }) => {

  const params = {
  effect: "fade",
  loop: true,  // Ensures the slider continues looping after the last slide
  speed: 1000,  // Time in milliseconds for the transition between slides
  autoplay: {
    delay: 5000,  // 5 seconds delay before moving to the next slide
    disableOnInteraction: false  // Keeps autoplay enabled even after user interaction
  },
  watchSlidesVisibility: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  renderPrevButton: () => (
    <button className="swiper-button-prev ht-swiper-button-nav">
      <i className="pe-7s-angle-left" />
    </button>
  ),
  renderNextButton: () => (
    <button className="swiper-button-next ht-swiper-button-nav">
      <i className="pe-7s-angle-right" />
    </button>
  )
};


  return (
    <div
      className={`slider-area ${spaceLeftClass ? spaceLeftClass : ""} ${
        spaceRightClass ? spaceRightClass : ""
      }`}
    >
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                
                <HeroSliderNineSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
                
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

HeroSliderNine.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default HeroSliderNine;
