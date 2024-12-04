import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";
import api from "../../constants/api";
import { getUser } from "../../common/user";
import { addToCompare } from "../../redux/actions/compareActions";

const Header = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,cartItems
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const[wishlistItems,setWishlistItems]=useState([]);
  const[compareItems,setCompareItems]=useState([]);
  // const[cartItems,setCartItems]=useState([]);
  const[categories,setCategories]=useState([]);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  useEffect(()=>{
    const user=getUser();
    if(user){
  
      api.post('/contact/getCompareByContactId',{contact_id:user.contact_id})
      .then((res)=>{
        setCompareItems(res.data.data)
      }).catch(err=>{console.log(err)})
  
      api.post('/contact/getFavByContactId',{contact_id:user.contact_id})
      .then((res)=>{
        setWishlistItems(res.data.data)
      }).catch(err=>{console.log(err)})
     
      // api.post('/contact/getCartProductsByContactId',{contact_id:user.contact_id})
      // .then((res)=>{
      //   setCartItems(res.data.data)
      // }).catch(err=>{console.log(err)})
    }
    
    },[])
   

  useEffect(()=>{
    
    api.get('/category/getAllCategory').then((res)=>{
      setCategories(res.data.data)
       
           }).catch(err=>{console.log(err)})
  },[])
 
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""} ${
        headerPositionClass ? headerPositionClass : ""
      }`}
    >
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ""} ${
          top === "visible" ? "d-none d-lg-block" : "d-none"
        } header-top-area ${
          borderStyle === "fluid-border" ? "border-none" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ""
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <Logo imageUrl="/images/United_Logo.png" logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu 
               categories={categories} 
               />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon group */}
              <IconGroup wishlistItems={wishlistItems} compareItems={compareItems}/>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
  cartItems:PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cartData,
    cartItems: state.cartItems.cartItems,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Header);