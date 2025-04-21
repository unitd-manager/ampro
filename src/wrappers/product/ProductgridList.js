import PropTypes from "prop-types";
import React, { Fragment,useState,useEffect } from "react";
import {v4 as uuid} from 'uuid';
import { useToasts } from "react-toast-notifications";
import { connect, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist, deleteFromWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import ProductGridSingleThree from "../../components/product/ProductGridShop";
import api from "../../constants/api";
import LoginModal from "../../components/LoginModal";
import { useParams } from "react-router-dom";
import { getUser } from "../../common/user";
import { fetchCartData, insertCartData,updateCartData } from "../../redux/actions/cartItemActions";
import { insertWishlistData } from "../../redux/actions/wishlistItemActions";
import { insertCompareData } from "../../redux/actions/compareItemActions";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  insertWishlistData,
  cartItems,
  updateCartData,
  InsertToCart,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  insertCompareData
}) => {
  const {addToast}=useToasts();
const[user,setUser]=useState();
const[loginModal,setLoginModal]=useState(false);
const [sessionId, setSessionId] = useState('');
const { id } = useParams();
console.log('user',user)
const dispatch=useDispatch();

  const onUpdateCart = (data) => {
    // if (avaiableQuantity === 0) {
    //   return;
    // }
    console.log('updatedata',data);
  if(user){
    console.log('user',user);
    data.contact_id=user.contact_id
    updateCartData(data,addToast)
  }
  else{
    setLoginModal(true)
  }   
   
  };

  const onAddToCart = (data) => {
    if (user) {
      if (data.price) {
        data.contact_id = user.contact_id;

        dispatch(insertCartData(data, addToast)) 
          .then(() => {
            dispatch(fetchCartData(user));
          })
          .catch((error) => {
            console.error('Failed to add to cart:', error);
          });
      }
    } else {
      addToast("Please Login", { appearance: "warning", autoDismiss: true });
      setLoginModal(true);
    }
  };
  
  
  const onAddToWishlist = (data) => {
    if(user){

      data.contact_id=user.contact_id
      insertWishlistData(data,addToast);
    
  }
    else{
      addToast("Please Login", { appearance: "warning", autoDismiss: true })
      setLoginModal(true)
    }
  };

  const onAddToCompare = (data) => {
 
    if(user){

      data.contact_id = user.contact_id
   insertCompareData(data,addToast)  
  }
    else{
      addToast("Please Login", { appearance: "warning", autoDismiss: true })
      setLoginModal(true)
    }
  };
   
  useEffect(()=>{
   
    const userInfo=getUser();
    setUser(userInfo)

    const existingSessionId = localStorage.getItem('sessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = uuid();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
  },[])

  return (
    <Fragment>
      {products.map(product => {
        return (
          <ProductGridSingleThree
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            onAddToCart={onAddToCart}
            onUpdateCart={onUpdateCart}
            onAddToWishlist={onAddToWishlist}
            onAddToCompare={onAddToCompare}
            addToCart={addToCart}
            InsertToCart={InsertToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            user={user}
            cartItem={
              cartItems.filter(
                cartItem => cartItem.product_id === product.product_id
              )[0]
            }
            wishlistItem={
              wishlistItems.filter(
                cartItem => cartItem.product_id === product.product_id
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.product_id === product.product_id
              )[0]
            }
            key={product.product_id}
          />
        );
      })}
      {loginModal&&<LoginModal loginModal={loginModal} setLoginModal={setLoginModal}/>}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
  updateCartData: PropTypes.func,
  InsertToCart: PropTypes.func,
  insertWishlistData: PropTypes.func,
  insertCompareData:PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartItems.cartItems,
    wishlistItems: state.wishlistData,
    compareItems: state.compareItems.compareItems
  };
};

const mapDispatchToProps = dispatch => {
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
    InsertToCart: (item, addToast) => {
      dispatch(insertCartData(item, addToast));
    },
    updateCartData: (item, addToast) => {
      dispatch(updateCartData(item, addToast));
    },
    insertWishlistData:(item,addToast)=>{
      dispatch(insertWishlistData(item,addToast));
    },
    removeWishlistData:(item,addToast)=>{
      dispatch(deleteFromWishlist(item,addToast));
    },
    insertCompareData: (item, addToast) => {
      dispatch(insertCompareData(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
