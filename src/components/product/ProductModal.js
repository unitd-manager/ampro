import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./ProductModal.css";
import Rating from "./sub-components/ProductRating";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
// import { addToWishlist } from "../../redux/actions/wishlistActions";
// import { addToCompare } from "../../redux/actions/compareActions";
import LoginModal from "../LoginModal";
import { insertCartData, updateCartData } from "../../redux/actions/cartItemActions";
import { insertWishlistData, removeWishlistData } from "../../redux/actions/wishlistItemActions";
// import { insertCompareData } from "../../redux/actions/compareItemActions";
import ProductImagesGallery from "./ProductImagesGallery";
import { v4 as uuid } from "uuid";

const ProductModal = ({
  product,
  cartItem,
  addToast,
  wishlistItem,
  addToCart,
  insertCartData,
  updateCartData,
  insertWishlistData,
  show,
  onHide,
}) => {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
console.log(getGallerySwiper,getThumbnailSwiper);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.qty_in_stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlistItems.wishlistItems);

  const onAddToCart = (data) => {
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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userInfo = userData ? JSON.parse(userData) : null;
    setUser(userInfo);

    if (!localStorage.getItem("sessionId")) {
      const newSessionId = uuid();
      localStorage.setItem("sessionId", newSessionId);
    }
  }, []);

  return (
    <Fragment>
      <Modal show={show} onHide={onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-5">
              {product.images && (
                <ProductImagesGallery product={product} productImages={product.images} />
              )}
            </div>
            <div className="col-md-7">
              <div className="product-details-content quickview-content">
                <h2>{product.title}</h2>
                {product.rating && product.rating > 0 && (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                )}
                <div className="pro-details-list">
                  <p>{product.description}</p>
                </div>

                {product.variation && (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Color</span>
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => (
                          <label className={`pro-details-color-content--single ${single.color}`} key={key}>
                            <input
                              type="radio"
                              value={single.color}
                              name="product-color"
                              checked={single.color === selectedProductColor}
                              onChange={() => {
                                setSelectedProductColor(single.color);
                                setSelectedProductSize(single.size[0].name);
                                setProductStock(single.size[0].stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>Size</span>
                      <div className="pro-details-size-content">
                        {product.variation.map((single) =>
                          single.color === selectedProductColor
                            ? single.size.map((singleSize, key) => (
                                <label className="pro-details-size-content--single" key={key}>
                                  <input
                                    type="radio"
                                    value={singleSize.name}
                                    checked={singleSize.name === selectedProductSize}
                                    onChange={() => {
                                      setSelectedProductSize(singleSize.name);
                                      setProductStock(singleSize.stock);
                                      setQuantityCount(1);
                                    }}
                                  />
                                  <span className="size-name">{singleSize.name}</span>
                                </label>
                              ))
                            : null
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
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
                          quantityCount < productStock ? quantityCount + 1 : quantityCount
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
                        onClick={() => {
                          if (cartItem?.qty > 0) {
                            product.qty = parseFloat(cartItem?.qty) + Number(quantityCount);
                            product.basket_id = cartItem.basket_id;
                            onUpdateCart(product, addToast);
                          } else {
                            onAddToCart(product, addToast);
                          }
                        }}
                        disabled={!productStock}
                      >
                        Add To Cart
                      </button>
                    ) : (
                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                  <div className="pro-details-wishlist">
                    <button
                      className={wishlistItem !== undefined ? "active" : ""}
                      title={
                        wishlistItems.find(w => w.product_id === product.product_id)
                          ? "Added to wishlist"
                          : "Add to wishlist"
                      }
                      onClick={() => {
                        const isInWishlist = wishlistItems.find(
                          w => w.product_id === product.product_id
                        );
                        if (isInWishlist) {
                          dispatch(removeWishlistData(isInWishlist, addToast));
                        } else {
                          onAddToWishlist(product);
                        }
                      }}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                </div>
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
};

ProductModal.propTypes = {
  product: PropTypes.object,
  cartItem: PropTypes.object,
  wishlistItem: PropTypes.object,
  addToast: PropTypes.func,
  addToCart: PropTypes.func,
  insertCartData: PropTypes.func,
  updateCartData: PropTypes.func,
  insertWishlistData: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item, addToast) => {
    dispatch(addToCart(item, addToast));
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
});

export default connect(null, mapDispatchToProps)(ProductModal);
