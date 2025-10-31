import React, { Fragment, useState, useEffect, useMemo, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useSelector, useDispatch } from "react-redux";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
import {
  fetchCartData,
  removeCartData,
  clearCartData,
  updateCartData,
} from "../../redux/actions/cartItemActions";
import imageBase from "../../constants/imageBase";
import Swal from "sweetalert2";
import "../../assets/css/button.css";

const Cart = ({ location }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const history = useHistory(); 
  const [mailId, setMailId] = useState("");

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.discount_amount ? item.price - item.discount_amount : item.price;
      return total + discountedPrice * item.qty;
    }, 0);
  }, [cartItems]);

  const handleIncreaseQuantity = useCallback(
    (item) => dispatch(updateCartData({ ...item, qty: item.qty + 1 }, addToast)),
    [dispatch, addToast]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      if (item.qty > 1) dispatch(updateCartData({ ...item, qty: item.qty - 1 }, addToast));
    },
    [dispatch, addToast]
  );

  const handleRemoveItem = useCallback(
    (item) => dispatch(removeCartData(item, addToast)),
    [dispatch, addToast]
  );

  const handleClearCart = useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCartData(user));
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (user) dispatch(fetchCartData(user));
    api.get("/setting/getMailId").then((res) => setMailId(res.data.data[0]));
  }, [dispatch, user]);

  const handleProceedToCheckout = () => {
    history.push('/checkout', cartItems);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Cart</title>
        <meta name="description" content="Cart page of Ampro eCommerce template." />
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
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <Link to={`/product/${item.product_id}/${item.title}`}>
                              <img
                                src={`${imageBase}${item.images[0]}`}
                                alt={item.title}
                                className="img-fluid"
                              />
                            </Link>
                          </td>
                          <td className="product-name text-center">{item.title}</td>
                          <td className="product-price text-center">
                            ${item.discount_amount ? (item.price - item.discount_amount).toFixed(2) : item.price.toFixed(2)}
                          </td>
                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <button className="dec qtybutton" onClick={() => handleDecreaseQuantity(item)}>-</button>
                              <input className="cart-plus-minus-box" type="text" value={item.qty} readOnly />
                              <button className="inc qtybutton" onClick={() => handleIncreaseQuantity(item)}>+</button>
                            </div>
                          </td>
                          <td className="product-subtotal text-center">
                            ${((item.discount_amount ? item.price - item.discount_amount : item.price) * item.qty).toFixed(2)}
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
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold', float: 'right' }}>
                    Grand Total: ${cartTotalPrice.toFixed(2)}
                  </h4>
                  <div className="button-group">
                    <button
                      className="clear-btn"
                      onClick={handleProceedToCheckout}
                      type="button"
                      style={{ backgroundColor: "#1fb0c1", color: "white", borderRadius: 50 }}
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className="clear-btn ml-10"
                      style={{ backgroundColor: "red", color: "white", borderRadius: 50 }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />
                      <Link to={process.env.PUBLIC_URL + "/shop"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
