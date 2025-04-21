import PropTypes from "prop-types";
import React from "react";
// import ReactHtmlParser from 'react-html-parser';
// import api from "../../constants/api"; 

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {

  // const [about, setAbout] = useState([])

  // const getAboutContent = () =>{
  //   api.get('/content/getAboutUsCompany').then(res=>{
  //     setAbout(res.data.data)
  //    })
  // }

  // useEffect(() => {
  //   getAboutContent(); 
  //   }, [])

  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Ampro</h1>
          {/* {about.map((data)=>{ 
   return(
    
        <div class="col-md-12 align-self-center pl-lg-4">

      <h2 class="section-title" data-aos="fade-up" data-aos-delay="200">{data.title}</h2>
      <p data-aos="fade-up" data-aos-delay="400">{ ReactHtmlParser(data.description)}</p>
      <p data-aos="fade-up" data-aos-delay="400">{ ReactHtmlParser(data.description1)}</p>
      </div>
    
   )
      })}  */}
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
