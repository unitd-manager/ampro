import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import featureIconData from "../../data/feature-icons/feature-icon-two.json";
import FeatureIconTwoSingle from "../../components/feature-icon/FeatureIconTwoSingle.js";
import api from "../../constants/api";

const FeatureIconTwo = ({ spaceTopClass, spaceBottomClass }) => {
  const [shipping, setShipping] = useState([])

  const getAboutContent = () =>{
    api.get('/content/getShipping',{recordType:'Shipping'}).then(res=>{
      setShipping(res.data.data)
     })
  }

  useEffect(() => {
    getAboutContent(); 
    }, [])
  return (
    <div
      className={`support-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row feature-icon-two-wrap">
          {shipping &&
            shipping.map((single, key) => {
              return (
                <FeatureIconTwoSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

FeatureIconTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FeatureIconTwo;
