import PropTypes from "prop-types";
import React from "react";
// import textGridData from "../../data/text-grid/text-grid-one.json";
import { useEffect } from "react";
import TextGridOneSingle from "../../components/text-grid/TextGridOneSingle.js";
import { useState } from "react";
import api from "../../constants/api.js";


const TextGridOne = ({ spaceBottomClass }) => {

  const [about, setAbout] = useState([])

  const getAboutContent = () =>{
    api.get('/content/getAboutUs',{recordType:'Record'}).then(res=>{
      setAbout(res.data.data)
     })
  }

  useEffect(() => {
    getAboutContent(); 
    }, [])

  return (
    <div
      className={`about-mission-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          {about &&
            about.map((single, key) => {
              return (
                <TextGridOneSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

TextGridOne.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TextGridOne;
