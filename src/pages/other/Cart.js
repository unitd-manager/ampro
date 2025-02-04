import React, { Fragment, useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useSelector, useDispatch } from "react-redux";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { 
  fetchCartData, 
  removeCartData, 
  clearCartData, 
  updateCartData 
} from "../../redux/actions/cartItemActions";
import imageBase from "../../constants/imageBase";

const Cart = ({ location }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); // Replace with your auth logic
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const currency = useSelector((state) => state.currencyData);

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.discount_amount
        ? item.price - item.discount_amount
        : item.price;
      return total + discountedPrice * item.qty;
    }, 0);
  }, [cartItems]);

  const handleIncreaseQuantity = useCallback(
    (item) => {
      const updatedItem = { ...item, qty: item.qty + 1 };
      dispatch(updateCartData(updatedItem, addToast));
    },
    [dispatch, addToast]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      if (item.qty > 1) {
        const updatedItem = { ...item, qty: item.qty - 1 };
        dispatch(updateCartData(updatedItem, addToast));
      }
    },
    [dispatch, addToast]
  );

  const handleRemoveItem = useCallback(
    (item) => {
      dispatch(removeCartData(item, addToast));
    },
    [dispatch, addToast]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCartData(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartData(user));
    }
  }, [dispatch, user]);

  return (
    <Fragment>
      <MetaTags>
        <title>Pearl | Cart</title>
        <meta name="description" content="Cart page of Pearl eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cart</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="table-content table-responsive cart-table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems?.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <Link to={`/product/${item.product_id}`}>
                              <img
                                src={`${imageBase}${item.images[0]}`}
                                alt={item.title}
                                className="img-fluid"
                              />
                            </Link>
                          </td>
                          <td className="product-name">{item.title}</td>
                          <td className="product-price-cart">
                            {currency.currencySymbol + item?.price?.toFixed(2)}
                          </td>
                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <button
                                className="dec qtybutton"
                                onClick={() => handleDecreaseQuantity(item)}
                              >
                                -
                              </button>
                              <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={item.qty}
                                readOnly
                              />
                              <button
                                className="inc qtybutton"
                                onClick={() => handleIncreaseQuantity(item)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            {currency.currencySymbol +
                              (item.price * item.qty).toFixed(2)}
                          </td>
                          <td className="product-remove">
                            <button onClick={() => handleRemoveItem(item)}>
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grand-totall">
                  <h4>
                    Grand Total: {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                  </h4>
                  <Link to="/checkout">Proceed to Checkout</Link>
                  <button onClick={handleClearCart}>Clear Cart</button>
                </div>
              </Fragment>
            ) : (
              <div className="item-empty-area text-center">
                <i className="pe-7s-cart"></i>
                <p>No items found in cart</p>
                <Link to="/shop">Shop Now</Link>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
