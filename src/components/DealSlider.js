import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row,Col} from 'reactstrap';
import api from '../constants/api';
import SectionTitle from './section-title/SectionTitle';
import Topdealslider from './Deal/Topdealslider';

const DealProductSlider = ({spaceBottomClass,spaceTopClass,products}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div
      className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
     
    >
    <div className='container'>
      <SectionTitle titleText="Top Deals!" positionClass="text-center" />
    <div className="row">
    
      <Col md={12}>
    
        <Topdealslider
        products={products}
        />
      {/* </div> */}
      </Col>
    
</div>
<div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/offers"}
          >
            VIEW ALL DEALS
          </Link>
        </div>
    </div>
    </div>
  );
};
DealProductSlider.propTypes = {

  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  products:PropTypes.array
};

export default DealProductSlider;