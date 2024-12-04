import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import imageBase from "../../constants/imageBase";
import { Badge } from "reactstrap";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition,productImages }) => {
  // const [gallerySwiper, getGallerySwiper] = useState(null);
  // const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // // effect for swiper slider synchronize
  // useEffect(() => {
  //   if (
  //     gallerySwiper !== null &&
  //     gallerySwiper.controller &&
  //     thumbnailSwiper !== null &&
  //     thumbnailSwiper.controller
  //   ) {
  //     gallerySwiper.controller.control = thumbnailSwiper;
  //     thumbnailSwiper.controller.control = gallerySwiper;
  //   }
  // }, [gallerySwiper, thumbnailSwiper]);

  // // swiper slider settings
  // const gallerySwiperParams = {
  //   getSwiper: getGallerySwiper,
  //   spaceBetween: 10,
  //   loopedSlides: 4,
  //   loop: true,
  //   effect: "fade"
  // };

  // const thumbnailSwiperParams = {
  //   getSwiper: getThumbnailSwiper,
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   loopedSlides: 4,
  //   touchRatio: 0.2,
  //   loop: true,
  //   slideToClickedSlide: true,
  //   direction: "vertical",
  //   breakpoints: {
  //     1200: {
  //       slidesPerView: 4,
  //       direction: "vertical"
  //     },
  //     992: {
  //       slidesPerView: 4,
  //       direction: "horizontal"
  //     },
  //     768: {
  //       slidesPerView: 4,
  //       direction: "horizontal"
  //     },
  //     640: {
  //       slidesPerView: 4,
  //       direction: "horizontal"
  //     },
  //     320: {
  //       slidesPerView: 4,
  //       direction: "horizontal"
  //     }
  //   }
  // };
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  // const [selectedProductColor, setSelectedProductColor] = useState(
  //   product.variation ? product.variation[0].color : ""
  // );
  // const [selectedProductSize, setSelectedProductSize] = useState(
  //   product.variation ? product.variation[0].size[0].name : ""
  // );
  // const [productStock, setProductStock] = useState(
  //   product.variation ? product.variation[0].size[0].stock : product.stock
  // );
  // const [quantityCount, setQuantityCount] = useState(1);

  // const wishlistItem = props.wishlistitem;
  // const compareItem = props.compareitem;

  // const addToCart = props.addtocart;
  // const addToWishlist = props.addtowishlist;
  // const addToCompare = props.addtocompare;

  // const addToast = props.addtoast;
  // const cartItems = props.cartitems;

  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );

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

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true
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
  product.images=String(product.images).split(',')

  return (
    <Fragment>
       <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.images &&
                    product.images.map((single,index) => {
                      return (
                    
                        <div key={index}>
                          <div className="single-image">
                            <img
                             src={`${imageBase}${single}`}
                              className="img-fluid"
                              alt=""
                              style={{maxHeight:'500px',maxWidth:'500px'}}
                            />
                          </div>
                        </div>
                      );
                    })
                    }
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.images &&
                    product.images.map((single,index) => {
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
            </div>
            </div>
      {/* <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          }`}
        >
          <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.latest ? <span className="purple"><Badge>New</Badge></span> : ""}
                {product.top_seller ? <span className="purple"><Badge>Best Seller</Badge></span> : ""}
                {product.most_popular ? <span className="purple"><Badge>Most Popular</Badge></span> : ""}
              </div>
            ) : (
              ""
            )}
            <LightgalleryProvider>
              <Swiper {...gallerySwiperParams}>
                {productImages &&
                  productImages.map((single, key,index) => {
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
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper {...thumbnailSwiperParams}>
              {productImages &&
                productImages.map((single, index) => {
                  return (
                    <div key={index}>
                      <div className="single-image">
                        <img
                           src={`${imageBase}${single.name}`}
                          className="img-fluid"
                          alt=""
                          style={{width:'200px',height:'200px'}} 
                        />
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
