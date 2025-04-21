import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
import { getUser } from "../../common/user";
import imageBase from "../../constants/imageBase";
import LottieComponent from "../../components/LottieComponent";
import {
  clearWishlistData,
  fetchWishlistData,
  removeWishlistData,
} from "../../redux/actions/wishlistItemActions";
import { insertCartData } from "../../redux/actions/cartItemActions";

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  deleteFromWishlist,
  deleteAllFromWishlist,
  wishlistData,
  removeWishlistData,
  clearWishlistData,
  insertCartData,
}) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const getWishlistItems = (userin) => {
    fetchWishlistData(userin);
  };

  const deleteItemFromWishlist = (Item) => {
    removeWishlistData(Item);
  };

  const clearWishlistItems = () => {
    clearWishlistData(user);
  };

  const onAddToCart = (data) => {
    data.contact_id = user.contact_id;
    insertCartData(data, addToast);
  };

  useEffect(() => {
    const userInfo = getUser();
    setUser(userInfo);
    if (userInfo) {
      getWishlistItems(userInfo);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Wishlist</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        {loading && <LottieComponent />}
        {!loading && (
          <div className="cart-main-area pt-90 pb-100">
            <div className="container">
              {wishlistData && wishlistData.length >= 1 ? (
                <Fragment>
                  <h3 className="cart-page-title">Your wishlist items</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-content table-responsive cart-table-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Add To Cart</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {wishlistData.map((wishlistItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                wishlistItem.price,
                                wishlistItem.discount_amount
                              );
                              const finalProductPrice = wishlistItem.price;
                              const finalDiscountedPrice = discountedPrice;
                              const cartItem = cartItems.find(
                                (item) => item.product_id === wishlistItem.product_id
                              );

                              return (
                                <tr key={key}>
                                  <td className="product-thumbnail">
                                    <Link
                                      to={`/product/${wishlistItem.product_id}/${wishlistItem.title}`}
                                    >
                                      <img
                                        className="img-fluid"
                                        src={`${imageBase}${wishlistItem.images[0]}`}
                                        alt=""
                                      />
                                    </Link>
                                  </td>
                                  <td className="product-name text-center">
                                    <Link
                                      to={`/product/${wishlistItem.product_id}/${wishlistItem.title}`}
                                    >
                                      {wishlistItem.title}
                                    </Link>
                                  </td>
                                  <td className="product-wishlist-cart">
                                    {wishlistItem.affiliateLink ? (
                                      <a
                                        href={wishlistItem.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Buy now
                                      </a>
                                    ) : wishlistItem.qty_in_stock > 0 ? (
                                      <button
                                        onClick={() => onAddToCart(wishlistItem)}
                                        className={
                                          cartItem && cartItem.quantity > 0 ? "active" : ""
                                        }
                                        disabled={cartItem && cartItem.quantity > 0}
                                      >
                                        {cartItem && cartItem.quantity > 0
                                          ? "Added"
                                          : "Add to cart"}
                                      </button>
                                    ) : (
                                      <button disabled className="active">
                                        Out of stock
                                      </button>
                                    )}
                                  </td>
                                  <td className="product-remove">
                                    <button
                                      onClick={() =>
                                        deleteItemFromWishlist(wishlistItem, addToast)
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Button Section (Aligned in Column) */}
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                    <div
  className="cart-shiping-update-wrapper"
  style={{
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  }}
>
  {/* Continue Shopping Button */}
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <Link
      to={process.env.PUBLIC_URL + "/shop"}
      style={{
        display: "inline-block",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 25px",
        border: "none",
        borderRadius: "3px",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "uppercase",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        textDecoration: "none", // Removes underline
      }}
    >
      Continue Shopping
    </Link>
  </div>

  {/* Clear Wishlist Button */}
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <button
      onClick={() => clearWishlistItems(addToast)}
      style={{
        display: "inline-block",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 25px",
        border: "none",
        borderRadius: "3px",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "uppercase",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
      }}
    >
      Clear Wishlist
    </button>
  </div>
</div>

                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-like"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No items found in wishlist <br />
                        <Link to={process.env.PUBLIC_URL + "/shop"}>Add Items</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </LayoutOne>
    </Fragment>
  );
};

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
  fetchWishlistData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartItems: state.cartData,
  wishlistItems: state.wishlistData,
  currency: state.currencyData,
  wishlistData: state.wishlistItems.wishlistItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item, addToast, quantityCount) => dispatch(addToCart(item, addToast, quantityCount)),
  addToWishlist: (item, addToast, quantityCount) => dispatch(addToWishlist(item, addToast, quantityCount)),
  deleteFromWishlist: (item, addToast, quantityCount) => dispatch(deleteFromWishlist(item, addToast, quantityCount)),
  fetchWishlistData: (user, addToast) => dispatch(fetchWishlistData(user, addToast)),
  clearWishlistData: (user, addToast) => dispatch(clearWishlistData(user, addToast)),
  removeWishlistData: (item, addToast) => dispatch(removeWishlistData(item, addToast)),
  insertCartData: (item, addToast) => dispatch(insertCartData(item, addToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
