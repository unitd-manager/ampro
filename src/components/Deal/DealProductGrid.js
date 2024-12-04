import PropTypes from "prop-types";
import React, { Fragment,useState,useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import api from "../../constants/api";
import LoginModal from "../../components/LoginModal";
import TopDealSingle from "./TopDealSingle";

const DealProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
  // addToast
}) => {
  const [user, setUser] = useState();
  const [loginModal,setLoginModal]=useState(false);
const {addToast}=useToasts();
  const onAddToCart = (data) => {
    // if (avaiableQuantity === 0) {
    //   return;
    // }
  if(user){
    data.contact_id=user.contact_id
    api.post('/contact/addToCart',data).then(()=>{  addToast("Added To Cart", { appearance: "success", autoDismiss: true });}).catch(err=>{addToast("unable to add To Cart", { appearance: "error", autoDismiss: true })})
  }
  else{
    setLoginModal(true)
  }   
   
  };

  const onAddToWishlist = (data) => {
    if(user){
  
      data.contact_id=user.contact_id
    api.post('/contact/insertToWishlist',data).then(()=>{ addToast("Added To Wishlist", { appearance: "success", autoDismiss: true });}).catch(err=>{addToast("unable to add To Wishlist", { appearance: "error", autoDismiss: true })})
     
    
    
  }
    else{
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true)
      }
  };
  useEffect(()=>{
    const userData = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null
    const userInfo=JSON.parse(userData);
    setUser(userInfo)
 
  },[])
  // useEffect(()=>{
    
  // products.forEach(element => {
  //   element.images=element.images.split(',')
  // });
  // },[products])
  return (
    <Fragment>
      {products && products.map((product) => {
        return (
          <TopDealSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            currency={currency}
            addToCart={onAddToCart}
            addToWishlist={onAddToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter((cartItem) => cartItem.product_id === product.product_id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                (wishlistItem) => wishlistItem.product_id === product.product_id
              )[0]
            }
            compareItem={
              compareItems.filter(
                (compareItem) => compareItem.product_id === product.product_id
              )[0]
            }
            key={product.product_id}
            titlePriceClass={titlePriceClass}
          />
        );
      })}
      {loginModal&&<LoginModal loginModal={loginModal} setLoginModal={setLoginModal}/>}
    </Fragment>
  );
};

DealProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
  
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealProductGrid);
