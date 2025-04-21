import PropTypes from "prop-types";
import React from "react";
import funFactData from "../../data/fun-fact/fun-fact-one.json";
import FunFactSingle from "../../components/fun-fact/FunFactSingle.js";

const FunFact = ({ spaceTopClass, spaceBottomClass, bgClass }) => {
  return (
    <div
      className={`funfact-area pt-100 pb-70 mb-100 mt-100 bg-gray-3`}
    >
      <div className="container">
        <div className="row">
          {funFactData &&
            funFactData.map((single, key) => {
              return (
                <FunFactSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                  textAlignClass="text-center"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

FunFact.propTypes = {
  bgClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FunFact;
