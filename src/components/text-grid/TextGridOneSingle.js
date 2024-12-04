import PropTypes from "prop-types";
import React from "react";
import ReactHtmlParser from 'react-html-parser';

const TextGridOneSingle = ({ data, spaceBottomClass }) => {
  
  return (
    <div className="col-lg-4 col-md-4">
      <div
        className={`single-mission ${spaceBottomClass ? spaceBottomClass : ""}`}
      >
        <h3>{data.title}</h3>
        <p>{ReactHtmlParser(data.description)}</p>
        <p>{ReactHtmlParser(data.description1)}</p>
      </div>
    </div>
  );
};

TextGridOneSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default TextGridOneSingle;
