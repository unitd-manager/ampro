import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import imageBase from "../../constants/imageBase";
import "./HeroSliderSingle.css"; // Import CSS file

const HeroSliderSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-slider-2 slider-height-1 ${sliderClass ? sliderClass : ""}`}
      style={{ backgroundImage: `url(${imageBase}${data.file_name})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-2 slider-animated-1">
              <h3 className="animated no-style">{data.title}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              <div className="slider-btn slider-btn--style2 btn-hover">
                <Link
                  className="animated rounden-btn"
                  to={process.env.PUBLIC_URL + "/shop"}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string,
};

export default HeroSliderSingle;
