import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import imageBase from "../../constants/imageBase";
import { useReducer } from "react";
import { removeWishlistData } from "../../redux/actions/wishlistItemActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  onUpdateCart,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  cartItem,
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
const history = useHistory();
const dispatch=useDispatch();

const handleCardClick = () => {
  history.push(`/product/${product.product_id}/${formattedTitle}`);
};
const wishlistItems=useSelector(state=>state.wishlistItems.wishlistItems);
  const discountedPrice = getDiscountPrice(product.price, product.discount_amount);
  // const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
    const finalProductPrice = +(product.price);
  const finalDiscountedPrice = +(
    discountedPrice);
    console.log('wishlistItems',wishlistItems);
  product.images= String(product.images).split(',')
console.log('file',product)
console.log('images',product.images)
const formattedTitle = product?.title?.replace(/\s+/g, '-');
console.log('cartItem',cartItem);

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-4 ${
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
            {product.discount_amount || product.latest ? (
                <div className="product-img-bad">
              <div className="product-img-badges">
                {product.discount_percentage ? (
                  <span className="pink">{product.discount_percentage}%</span>
                ) : (
                  ""
                )}
                {product.latest ? <span className="purple" ><Badge style={{position:'relative',top:'2px',right:'5px'}}></Badge></span> : ""}
                {product.top_seller ? <span className="purple" ><Badge style={{position:'relative',top:'5px',right:'2px'}}></Badge></span> : ""}
                {product.most_popular ? <span className="purple"><Badge style={{position:'relative',top:'5px',right:'2px'}}></Badge></span> : ""}
              </div>
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
                to={process.env.PUBLIC_URL + "/product/" + product.product_id+"/"+formattedTitle}
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
                  // className={
                  //   cartItem !== undefined && cartItem.quantity > 0
                  //     ? "active"
                  //     : ""
                  // }
                  className={
                    product !== undefined && product.qt_in_stock > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
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

              <button onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                setModalShow(true);}} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>
     
              {/* <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                onClick={() => {onAddToCompare(product,addToast)}}
              >
                <i className="fa fa-retweet"></i>
              </button> */}
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
  className={wishlistItems.some(wishlistItem => wishlistItem.product_id === product.product_id) ? "active" : ""}
  title={
    wishlistItems.some(wishlistItem => wishlistItem.product_id === product.product_id)
      ? "Added to wishlist"
      : "Add to wishlist"
  }
  onClick={(e) => {
    e.stopPropagation(); // Prevent card click
    const isInWishlist = wishlistItems.find(
      wishlistItem => wishlistItem.product_id === product.product_id
    );
    if (isInWishlist) {
      dispatch(removeWishlistData(isInWishlist, addToast));
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
        cartItem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        onUpdateCart={onUpdateCart}
        addtocart={onAddToCart}
        addtowishlist={onAddToWishlist}
        addtocompare={onAddToCompare}
        addToast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  onAddToCart: PropTypes.func,
  onUpdateCart: PropTypes.func,
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
