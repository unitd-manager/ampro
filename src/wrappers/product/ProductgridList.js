import PropTypes from "prop-types";
import React, { Fragment,useState,useEffect } from "react";
import {v4 as uuid} from 'uuid';
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import api from "../../constants/api";
import LoginModal from "../../components/LoginModal";
import { useParams } from "react-router-dom";
import { getUser } from "../../common/user";
import { insertCartData } from "../../redux/actions/cartItemActions";
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

  const onAddToCart = (data) => {
   
    if(user){
      if(data.price){
    data.contact_id=user.contact_id
  
    InsertToCart(data,addToast);}
    }
    else{
      addToast("Please Login", { appearance: "warning", autoDismiss: true })
      setLoginModal(true)
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
          <ProductGridSingleTwo
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            onAddToCompare={onAddToCompare}
            addToCart={addToCart}
            InsertToCart={InsertToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            user={user}

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
  InsertToCart: PropTypes.func,
  insertWishlistData: PropTypes.func,
  insertCompareData:PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    cartItems:state.cartItems,
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
    insertWishlistData:(item,addToast)=>{
      dispatch(insertWishlistData(item,addToast));
    },
    insertCompareData: (item, addToast) => {
      dispatch(insertCompareData(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);