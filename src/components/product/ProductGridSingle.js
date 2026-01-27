import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import imageBase from "../../constants/imageBase";
// import Rating from "./sub-components/ProductRating";

import { removeWishlistData } from "../../redux/actions/wishlistItemActions";

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  onAddToCart,
  onUpdateCart,
  onAddToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlistItems.wishlistItems);

  const discountedPrice = getDiscountPrice(product.price, product.discount_amount);
  const finalProductPrice = +product.price;
  const finalDiscountedPrice = discountedPrice ? +(discountedPrice * currency.currencyRate).toFixed(2) : finalProductPrice;

  product.images = String(product.images).split(",");
  const formattedTitle = product.title.substring(0, 25).replace(/\s+/g, "-");

  return (
    <Fragment>
      <div className={`product-range ${sliderClassName || ""}`}>
        <div className={`product-wrap ${spaceBottomClass || ""}`}>
          <div className="product-img">
            <Link to={`${process.env.PUBLIC_URL}/product/${product.product_id}/${formattedTitle}`}>
              <img className="default-img" src={`${imageBase}${product.images[0]}`} alt="" style={{height:'230px'}} />
              {product.images.length > 1 && (
                <img className="hover-img" src={`${imageBase}${product.images[1]}`} alt="" style={{height:'250px'}} />
              )}
            </Link>
            {product.discount_amount || product.latest || product.top_seller || product.most_popular ? (
              <div className="product-img-badges">
                {product.discount_percentage && <span className="pink">{product.discount_percentage}%</span>}
              
                {product.most_popular && <span className="purple">Popular</span>}
              </div>
            ) : null}
           
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={`${process.env.PUBLIC_URL}/product/${product.product_id}/${formattedTitle}`}>{formattedTitle}</Link>
            </h3>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>
                  <span className="old">{currency.currencySymbol + finalProductPrice}</span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice}</span>
              )}
            </div>
              {/* <div className="product-rating">
                <Rating ratingValue={product.top_rating} />
              </div> */}
            <div className="pro-wishlist">
            {product.qty_in_stock > 0 ? (
                <button
                  onClick={() => {
                    if (cartItem?.qty > 0) {
                      product.qty = parseFloat(cartItem?.qty) + 1;
                      product.basket_id = cartItem.basket_id;
                      onUpdateCart(product, addToast);
                    } else {
                      onAddToCart(product, addToast);
                    }
                  }}
                  className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
                >
                 <i className="fa fa-shopping-cart"></i>
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}
                <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={wishlistItems.some(item => item.product_id === product.product_id) ? "Added to wishlist" : "Add to wishlist"}
                onClick={() => {
                  const isInWishlist = wishlistItems.some(item => item.product_id === product.product_id);
                  if (isInWishlist) {
                    dispatch(removeWishlistData(product,addToast));
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
      {modalShow && (
        <ProductModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          product={product}
          currency={currency}
          discountedprice={discountedPrice}
          finalproductprice={finalProductPrice}
          finaldiscountedprice={finalDiscountedPrice}
          cartItem={cartItem}
          wishlistitem={wishlistItem}
          addToast={addToast}
        />
      )}
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  onAddToCart: PropTypes.func,
  onUpdateCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductGridSingle;