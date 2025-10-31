import PropTypes from "prop-types";
import React from "react";
import {Link} from 'react-router-dom';
// import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import RelatedProductGrid from "./RelatedProductGrid";


const RelatedProductSlider = ({products, spaceBottomClass, category }) => {

  // const settings = {
  //   loop: false,
  //   slidesPerView: 4,
  //   grabCursor: true,
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 4
  //     },
  //     768: {
  //       slidesPerView: 3
  //     },
  //     640: {
  //       slidesPerView: 2
  //     },
  //     320: {
  //       slidesPerView: 1
  //     }
  //   }
  // };

  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-50"
        />
        <div className="row">
          {/* <Swiper {...settings}> */}
            <RelatedProductGrid
            products={products}
              category={category}
              limit={6}
              sliderClassName="swiper-slide"
            />
          {/* </Swiper> */}
        </div>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;
