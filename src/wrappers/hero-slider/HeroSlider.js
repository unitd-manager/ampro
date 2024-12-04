import PropTypes from "prop-types";
import React,{useState} from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HeroSliderSingle from "../../components/hero-slider/HeroSliderSingle.js";
import 'react-awesome-slider/dist/styles.css';

const HeroSlider = ({ spaceLeftClass, spaceRightClass,interval,sliderData }) => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
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

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      className={`slider-area ${spaceLeftClass ? spaceLeftClass : ""} ${
        spaceRightClass ? spaceRightClass : ""
      }`}
    >
    
      <div className="slider-active nav-style-1">
        {/* <Swiper {...params}> */}
        <Carousel selectedItem={activeSlide}>
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                <HeroSliderSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
            </Carousel>
        {/* </Swiper> */}
      </div>
     
  </div>
    
  );
};

HeroSlider.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
  sliderData:PropTypes.array
};

export default HeroSlider;
