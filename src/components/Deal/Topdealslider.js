import PropTypes from "prop-types";
import React,{useEffect,useState} from "react";
// import Swiper from "react-id-swiper";
// import SectionTitle from "../../components/section-title/SectionTitle";
// import DealProductGrid from "./DealProductGrid";
// import ProductGridTwo from "../../wrappers/product/ProductGridTwo";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
// import api from "../../constants/api";
import LoginModal from "../../components/LoginModal";
import TopDealSingle from "./TopDealSingle";
import { getUser } from "../../common/user";
import 'react-multi-carousel/lib/styles.css';
import { insertCartData } from "../../redux/actions/cartItemActions";
import { insertWishlistData } from "../../redux/actions/wishlistItemActions";
import { insertCompareData } from "../../redux/actions/compareItemActions";

const Topdealslider = ({products, spaceBottomClass, category ,
    currency,
    addToCart,
    addToWishlist,
    addToCompare,
    cartItems,
    wishlistItems,
    compareItems,
    sliderClassName,
    colorClass,
    titlePriceClass,
  insertCartData,
  insertCompareData,
insertWishlistData}) => {
    
  // const setting = {
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
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1
  //   }
  // };
  const [user, setUser] = useState();
  const [loginModal,setLoginModal]=useState(false);
const {addToast}=useToasts();

  const onAddToCart = (data) => {
  if(user){
    data.contact_id=user.contact_id
  insertCartData(data,addToast) 
  }
  else{
    setLoginModal(true)
  }   
   
  };
  const onAddToCompare = (data) => {
 
    if(user){

      data.contact_id = user.contact_id
   insertCompareData(data,addToast)  
  }
}
  const onAddToWishlist = (data) => {
    if(user){
  
      data.contact_id=user.contact_id
   insertWishlistData(data,addToast)
  }
    else{
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true)
      }
  };
  useEffect(()=>{
    const userData = getUser()
    
    setUser(userData)
 
  },[])
 
  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
       
        <div className="row">
          {/* <Swiper {...thumbnailSwiperParams}> */}
          
           {products && products.slice(0,4).map((product) => {
        return (
         
          <TopDealSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            currency={currency}
            addToCart={onAddToCart}
            addToWishlist={onAddToWishlist}
            addToCompare={onAddToCompare}
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
          {/* </Swiper> */}
        </div>
      </div>
    </div>
  );
};

Topdealslider.propTypes = {
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
    wishlistItems: PropTypes.array,
    insertCompareData:PropTypes.func,
    insertCartData:PropTypes.func,
    insertWishlistData:PropTypes.func
  };
  
  const mapStateToProps = (state, ownProps) => {
    return {
    
      currency: state.currencyData,
      cartItems: state.cartData,
      wishlistItems: state.wishlistData,
      compareItems: state.compareItems.compareItems
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
      },
      insertCartData: (item, addToast) => {
        dispatch(insertCartData(item, addToast));
      },
      insertWishlistData: (item, addToast) => {
        dispatch(insertWishlistData(item, addToast));
      },
      insertCompareData: (item, addToast) => {
        dispatch(insertCompareData(item, addToast));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Topdealslider);
  