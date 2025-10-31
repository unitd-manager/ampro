import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import imageBase from "../../constants/imageBase";
// import { Badge } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeWishlistData } from "../../redux/actions/wishlistItemActions";
import { useDispatch } from "react-redux";

const ProductRelatedSingle = ({
  product,
  currency,
  onAddToCart,
  onAddToWishlist,
  onUpdateCart,
  addToCompare,
  //cartItem,
  wishlistItem,
  cartItems,
  wishlistItems,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const dispatch=useDispatch();

const history=useHistory();
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price);
  const finalDiscountedPrice = +(
    discountedPrice
  );
  
  const cartItem=cartItems.filter((cartItem) => cartItem.product_id === product.product_id)[0]
console.log('cartItems',cartItems);
  product.images= String(product.images).split(',')
  const formattedTitle = product.title.replace(/\s+/g, '-');
  const handleCardClick = () => {
    history.push(`/product/${product.product_id}/${formattedTitle}`);
  };
  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
          onClick={handleCardClick}
        >
          <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.product_id+"/"+formattedTitle}>
              <img
                className="default-img"
                src={`${imageBase}${product.images[0]}`}
                alt=""
                style={{width:'250px',height:'250px'}}
              />
              {product.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={`${imageBase}${product.images[1]}`}
                  alt=""
                  style={{width:'250px',height:'250px'}}
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount_percentage || product.latest ? (
              <div className="product-img-badges">
                {product.discount_percentage ? (
                  <span className="pink">-{product.discount_percentage}%</span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Buy now"
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link
                  to={`${process.env.PUBLIC_URL}/product/${product.product_id}/${formattedTitle}`}
                  title="Select options"
                >
                  <i className="fa fa-cog"></i>
                </Link>
              ) : product.qty_in_stock && product.qty_in_stock > 0 ? (
                <button
                onClick={ (e) => { 
                  e.stopPropagation(); // Prevent card click
                  if(cartItem?.qty>0){
                  product.qty=parseFloat(cartItem?.qty) +Number(1);
                  product.basket_id=cartItem.basket_id;
                  onUpdateCart(product,addToast)
                }else{
                  onAddToCart(product, addToast)}}}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  // disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button onClick={(e) =>{ e.stopPropagation(); 
               setModalShow(true);}} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>

             
            </div>
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.product_id+"/"+formattedTitle}>
                  <span className="product-name">{product.title}</span>
                </Link>
              </h3>
            </div>
            <div className="pro-wishlist-2">
               <button
                              className={wishlistItem !== undefined ? "active" : ""}
                              disabled={wishlistItem !== undefined}
                              title={
                                wishlistItems.filter(
                                  wishlistItem => wishlistItem.product_id === product.product_id
                                )[0]
                                  ? "Added to wishlist"
                                  : "Add to wishlist"
                              }
                              // onClick={() =>{ onAddToWishlist(product,addToast)}}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                const isInWishlist = wishlistItems.filter(
                                  wishlistItem => wishlistItem.product_id === product.product_id
                                )[0];
                                console.log('wishlistitem',isInWishlist);
                                if(isInWishlist) {
                                  dispatch(removeWishlistData(isInWishlist,addToast));
                                  
                                } else {
                                  onAddToWishlist(product);
                                }
                              }} 
                            >
                              <i
    className={`fa ${
      wishlistItems.some(wishlistItem => wishlistItem.product_id === product.product_id)
        ? "fa-heart"
        : "fa-heart-o"
    }`}
    style={{
      color: wishlistItems.some(wishlistItem => wishlistItem.product_id === product.product_id)
        ? "#96dbfc"
        : "gray"
    }}
  />
                            </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={onAddToCart}
        addtowishlist={onAddToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductRelatedSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  cartItems: PropTypes.array,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductRelatedSingle;
