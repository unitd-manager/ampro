import PropTypes from "prop-types";
import React from "react";
import OrderGrid from "./orderGrid";
import { connect } from "react-redux";

const OrderLists = ({ products, layout,currency }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <OrderGrid products={products} currency={currency} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

OrderLists.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
  currency: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};


export default connect(mapStateToProps)(OrderLists);