import PropTypes from "prop-types";
import React from "react";
import ReactHtmlParser from 'react-html-parser';
import imageBase from "../../constants/imageBase";


const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="support-wrap mb-30">
        <div className="support-icon">
        
           <img
                className="animated"
                src={`${imageBase}${singleFeature.file_name}`}
                alt=""
              />
        </div>
        <div className="support-content">
          <h5>{singleFeature.title}</h5>
          <p>{ReactHtmlParser(singleFeature.description)}</p>
        </div>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.object
};

export default FeatureIconSingle;
