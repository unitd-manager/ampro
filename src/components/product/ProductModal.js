import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { v4 as uuid } from "uuid";
// import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import imageBase from "../../constants/imageBase";
import LoginModal from "../LoginModal";
import { insertCartData, updateCartData } from "../../redux/actions/cartItemActions";
import { insertWishlistData } from "../../redux/actions/wishlistItemActions";
import { insertCompareData } from "../../redux/actions/compareItemActions";

const ProductModal = ({
  product,
  discountedPrice,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  cartItem,
  addToast,
  wishlistItem,
  compareItem,
  addToCart,
  addToWishlist,
  addToCompare,
  comments,
  insertCartData,
  updateCartData,
  insertWishlistData,
  insertCompareData,
  currency,
  discountedprice,
  finalproductprice,
  finaldiscountedprice,
  show,
  onHide,
}) => {
  // const { product } = props;
  // const { currency } = props;
  // const { discountedprice } = props;
  // const { finalproductprice } = props;
  // const { finaldiscountedprice } = props;
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);

  console.log("proimage", product.images);
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const [sessionId, setSessionId] = useState("");
console.log('modalcartitem',cartItem)
  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );
  const onAddToCart = (data) => {
    // dispatch(addToCart(data, 1, "none", "none"));
    if (user) {
      data.contact_id = user.contact_id;
      data.qty = quantityCount;
      insertCartData(data, addToast);
    } else {
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true);
    }
  };
  const onUpdateCart = (data) => {
    // dispatch(addToCart(data, 1, "none", "none"));
    if (user) {
      data.contact_id = user.contact_id;
      
      updateCartData(data, addToast);
    } else {
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true);
    }
  };

  const onAddToWishlist = (data) => {
    if (user) {
      data.contact_id = user.contact_id;
      insertWishlistData(data, addToast);
    } else {
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true);
    }
  };
  const onAddToCompare = (data) => {
    if (user) {
      data.contact_id = user.contact_id;
      insertCompareData(data, addToast);
    } else {
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true);
    }
  };
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
    loop: true,
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
      prevEl: ".swiper-button-prev",
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
    ),
  };
  useEffect(() => {
    const userData = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    const userInfo = JSON.parse(userData);
    setUser(userInfo);

    const existingSessionId = localStorage.getItem("sessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = uuid();
      localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.images &&
                    product.images.map((single, index) => {
                      return (
                        <div key={index}>
                          <div className="single-image">
                            <img
                              src={`${imageBase}${single}`}
                              className="img-fluid"
                              alt=""
                              style={{ maxWidth: "500px", maxHeight: "500px" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
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
                              style={{ width: "70px", height: "70px" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.title}</h2>
                <div className="product-details-price">
                  {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + finaldiscountedprice}
                      </span>{" "}
                      <span className="old">
                        {currency.currencySymbol + finalproductprice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finalproductprice} </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="pro-details-list">
                  <p>{product.description}</p>
                </div>

                {product.variation ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Color</span>
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => {
                          return (
                            <label
                              className={`pro-details-color-content--single ${single.color}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={single.color}
                                name="product-color"
                                checked={
                                  single.color === selectedProductColor
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(single.color);
                                  setSelectedProductSize(single.size[0].name);
                                  setProductStock(single.size[0].stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="checkmark"></span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>Size</span>
                      <div className="pro-details-size-content">
                        {product.variation &&
                          product.variation.map((single) => {
                            return single.color === selectedProductColor
                              ? single.size.map((singleSize, key) => {
                                  return (
                                    <label
                                      className={`pro-details-size-content--single`}
                                      key={key}
                                    >
                                      <input
                                        type="radio"
                                        value={singleSize.name}
                                        checked={
                                          singleSize.name ===
                                          selectedProductSize
                                            ? "checked"
                                            : ""
                                        }
                                        onChange={() => {
                                          setSelectedProductSize(
                                            singleSize.name
                                          );
                                          setProductStock(singleSize.stock);
                                          setQuantityCount(1);
                                        }}
                                      />
                                      <span className="size-name">
                                        {singleSize.name}
                                      </span>
                                    </label>
                                  );
                                })
                              : "";
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.affiliateLink ? (
                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover ml-0">
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount < productStock 
                              ? quantityCount + 1
                              : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {product && product.qty_in_stock > 0 ? (
                        <button
                          // onClick={() =>
                          //   onAddToCart(
                          //     product,
                          //     addToast,
                          //     quantityCount,
                          //     selectedProductColor,
                          //     selectedProductSize
                          //   )
                          // }
                          onClick={ () => { 
                            if(cartItem?.qty>0){
                            product.qty=parseFloat(cartItem?.qty) +Number( quantityCount);
                            product.basket_id=cartItem.basket_id;
                            onUpdateCart(product,addToast)
                          }else{
                            onAddToCart(product,
                                  addToast,
                                  quantityCount,
                                  selectedProductColor,
                                  selectedProductSize
                              )}}}
                          disabled={ productStock}
                        >
                          {" "}
                          Add To Cart{" "}
                        </button>
                      ) : (
                        <button disabled>Out of Stock</button>
                      )}
                    </div>
                    <div className="pro-details-wishlist">
                      <button
                        className={wishlistItem !== undefined ? "active" : ""}
                        disabled={wishlistItem !== undefined}
                        title={
                          wishlistItem !== undefined
                            ? "Added to wishlist"
                            : "Add to wishlist"
                        }
                        onClick={() => onAddToWishlist(product, addToast)}
                      >
                        <i className="pe-7s-like" />
                      </button>
                    </div>
                    <div className="pro-details-compare">
                      <button
                        className={compareItem !== undefined ? "active" : ""}
                        disabled={compareItem !== undefined}
                        title={
                          compareItem !== undefined
                            ? "Added to compare"
                            : "Add to compare"
                        }
                        onClick={() => onAddToCompare(product, addToast)}
                      >
                        <i className="pe-7s-shuffle" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {loginModal && (
        <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      )}
    </Fragment>
  );
}

ProductModal.propTypes = {
  addToCart: PropTypes.func,
  addToast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  // cartItems: PropTypes.array,
  cartItem: PropTypes.object,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
  insertCompareData: PropTypes.func,
  insertCartData: PropTypes.func,
  insertWishlistData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    insertCartData: (item, addToast) => {
      dispatch(insertCartData(item, addToast));
    },
    updateCartData: (item, addToast) => {
      dispatch(updateCartData(item, addToast));
    },
    insertWishlistData: (item, addToast) => {
      dispatch(insertWishlistData(item, addToast));
    },
    insertCompareData: (item, addToast) => {
      dispatch(insertCompareData(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductModal);
