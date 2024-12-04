import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import imageBase from "../../constants/imageBase";

const ProductImageGallery = ({ product ,productImages}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  console.log('productimages',product.images)
  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount_percentage ? (
              <span className="pink">{product.discount_percentage}%</span>
            ) : (
              ""
            )}
            {product.tag === 'new' ? <span className="purple">New</span> : ""}
            {product.tag === 'best seller' ? <span className="purple">Best Seller</span> : ""}
          </div>
        ) : (
          ""
        )}
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.images &&
              product.images.map((single, index) => {
                return (
                  <div key={index}>
                    <LightgalleryItem
                      group="any"
                      src={`${imageBase}${single}`}
                      style={{width:'100px',height:'100px'}}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                         src={`${imageBase}${single}`}
                        className="img-fluid"
                        alt=""
                        style={{width:'100px',height:'100px'}}
                      />
                    </div>
                  </div>
                );
              })}
                 {productImages &&
              productImages.map((single, index) => {
                return (
                  <div key={index}>
                    <LightgalleryItem
                      group="any"
                      src={`${imageBase}${single.name}`}
                      
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={`${imageBase}${single.name}`}
                        className="img-fluid"
                        alt=""
                        
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>
          {product.images &&
            product.images.map((single, index) => {
              return (
                <div key={index}>
                  <div className="single-image">
                    <img
                        src={`${imageBase}${single}`}
                      className="img-fluid"
                      alt=""
                      style={{width:'100px',height:'100px'}}
                    />
                  </div>
                </div>
              );
            })}
          
        </Swiper>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
