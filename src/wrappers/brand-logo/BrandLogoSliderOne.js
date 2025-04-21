import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandLogoSliderOne = ({ spaceBottomClass, spaceTopClass }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 320,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div
      className={`brand-logo-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }  ${spaceTopClass ? spaceTopClass : ""}`}
    >
      <div className="container">
        <div className="brand-logo-active">
          <Slider {...settings}>
            {brandLogoData &&
              brandLogoData.map((single, key) => (
                <BrandLogoOneSingle
                  data={single}
                  key={key}
                  sliderClassName="slick-slide"
                  spaceBottomClass="mb-30"
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

BrandLogoSliderOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BrandLogoSliderOne;
