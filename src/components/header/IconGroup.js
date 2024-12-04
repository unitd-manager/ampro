import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { getUser } from "../../common/user";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  wishlistItems,
  cartItems,
  compareItems,
  deleteFromCart,
  iconWhiteClass
}) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
const logout=()=>{
  localStorage.clear()
  setTimeout(()=>{
    window.location.reload()
  },200)
}
const user=getUser();
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
     
     <div className="same-style account-setting">
              <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
         {user&& <ul>
           
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                My Account
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/orders"}>
                My Orders
              </Link>
            </li>
            <li>
              <Link to=""><span onClick={logout}>Log Out</span></Link>
            </li>
          
          </ul>}
         {!user&& <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
          </ul>}
        </div>
      </div>
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"} title="Compare">
          <i className="pe-7s-shuffle" />
          <span className="count-style" >
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}  title="Compare" >
          <i className="pe-7s-shuffle" />
          <span className="count-style" >
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}  title="Wishlist" >
          <i className="pe-7s-like" />
          <span className="count-style" >
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
  <Link to={process.env.PUBLIC_URL + "/cart"}>
    <button className="icon-cart" title="Cart">
      <i className="pe-7s-shopbag" />
      <span className="count-style">
        {cartItems && cartItems.length ? cartItems.length : 0}
      </span>
    </button>
  </Link>
  <MenuCart
    cartData={cartItems}
    currency={currency}
    deleteFromCart={deleteFromCart}
  />
</div>
<div className="same-style cart-wrap d-block d-lg-none">
  <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
    <i className="pe-7s-shopbag" />
    <span className="count-style">
      {cartItems && cartItems.length ? cartItems.length : 0} {/* Updated here */}
    </span>
  </Link>
</div>

      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  wishlistItems:PropTypes.array,
  cartItems:PropTypes.array,
  compareItems:PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    cartItems: state.cartItems.cartItems,
    wishlistData: state.wishlistData,
    wishlistItems:state.wishlistItems.wishlistItems,
    compareData: state.compareData,
    compareItems:state.compareItems.compareItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
