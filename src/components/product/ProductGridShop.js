import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import imageBase from "../../constants/imageBase";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistData } from "../../redux/actions/wishlistItemActions";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  onAddToCart,
  onUpdateCart,
  onAddToWishlist,
  onAddToCompare,
  cartItem,
  cartItems,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
  InsertToCart,
  user
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
const[loginModal , setLoginModal]=useState(false);

const dispatch=useDispatch();


const wishlistItems=useSelector(state=>state.wishlistItems.wishlistItems);
  const discountedPrice = getDiscountPrice(product.price, product.discount_amount);
  //const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalProductPrice = +(product.price);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // ).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  
product.images= String(product.images).split(',')
console.log('file',product)
console.log('images',product.images)
console.log('cartItem',cartItem)
console.log('cartItems',cartItems)
const formattedTitle = product.title.replace(/\s+/g, '-');

  return (
    <Fragment>
      <div
        className="col-md-4"
      >
        <div
          className={`product-wrap ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
          style={{ padding: "10px" }}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.product_id+"/"+formattedTitle}>
              <img
                className="default-img"
                src={`${imageBase}${product.images[0]}`}
                alt=""
                style={{height:'250px',width:'250px'}}
              />
               {product.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={`${imageBase}${product.images[1]}`}
                  alt=""
                  style={{height:'250px',width:'250px'}}
                />
              ) : (
                ""
              )}
              
            </Link>
      
            <div className="product-action">
            <div className="pro-same-action pro-wishlist">
  <button
    className={`wishlist-btn ${wishlistItem !== undefined ? "active" : ""}`}
    title={
      wishlistItems.some(
        (wishlistItem) => wishlistItem.product_id === product.product_id
      )
        ? "Added to wishlist"
        : "Add to wishlist"
    }
    onClick={() => {
      const isInWishlist = wishlistItems.some(
        (wishlistItem) => wishlistItem.product_id === product.product_id
      );

      console.log("wishlistitem", isInWishlist);

      if (isInWishlist) {
        dispatch(removeWishlistData(product, addToast));
      } else {
        onAddToWishlist(product);
      }
    }}
  >
    <i className={`fa ${wishlistItems.some((item) => item.product_id === product.product_id) ? "fa-heart" : "fa-heart-o"}`} />
  </button>
</div>

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
                <div class="pro-same-action pro-cart">
                <button
                onClick={ () => { 
                  if(cartItem?.qty>0){
                  product.qty=parseFloat(cartItem?.qty) +Number(1);
                  product.basket_id=cartItem.basket_id;
                  onUpdateCart(product,addToast)
                }else{
                  onAddToCart(product, addToast)}}}
                
                  className={
                    product !== undefined && product.qt_in_stock > 0
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
                </div>
              ) : (
                <div class="pro-same-action pro-cart">

                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
                </div>
              )}
            
<div class="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>
     </div>
            </div>
          </div>
          <div className="product-content text-center">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
             <h3 style={{ minHeight: "60px", display: "flex", alignItems: "center" }}>
  <Link to={process.env.PUBLIC_URL + "/product/" + product.product_id + "/" + formattedTitle}>
    <span className="product-name">{product.title}</span>
  </Link>
</h3>
            </div>
          
          </div>
        </div>
      </div>
      {/* product modal */}
     {modalShow && <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartItem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        onUpdateCart={onUpdateCart}
        addtocart={onAddToCart}
        addtowishlist={onAddToWishlist}
        addtocompare={onAddToCompare}
        addToast={addToast}
      />}
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
  onAddToCompare: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  InsertToCart: PropTypes.func,
  user: PropTypes.object
};

export default ProductGridSingleTwo;
