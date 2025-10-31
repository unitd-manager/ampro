import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import imageBase from "../../constants/imageBase";
import { getUser } from "../../common/user";
import {
  fetchCompareData,
  removeCompareData,
} from "../../redux/actions/compareItemActions";

const Compare = ({
  location,
  cartItems,
  addToCart,
  currency,
  compareItems,
  fetchCompareData,
  removeCompareData,
}) => {
  const { pathname } = location;
  const { addToast } = useToasts();

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) {
      fetchCompareData(userInfo, addToast);
    }
  }, [fetchCompareData, addToast]);

  const deleteItemFromCompare = (item) => {
    removeCompareData(item, addToast);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Compare</title>
        <meta
          name="description"
          content="Compare page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Compare
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="compare-main-area pt-90 pb-100">
          <div className="container">
            {compareItems && compareItems.length > 0 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">Product Info</th>
                            {compareItems.map((item, key) => {
                              const cartItem = cartItems.find((c) => c.id === item.id);
                              return (
                                <td className="product-image-title" key={key}>
                                  <div className="compare-remove">
                                    <button onClick={() => deleteItemFromCompare(item)}>
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/shop/${item.id}`}
                                    className="image"
                                  >
                                    <img
                                      className="img-fluid"
                                      src={`${imageBase}${item.images[0]}`}
                                      alt={item.title}
                                      style={{ height: "250px", width: "250px" }}
                                    />
                                  </Link>
                                  <div className="product-title">
                                    <Link to={`${process.env.PUBLIC_URL}/shop/${item.id}`}>
                                      {item.title}
                                    </Link>
                                  </div>
                                  <div className="compare-btn">
                                    {item.affiliateLink ? (
                                      <a
                                        href={item.affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        Buy now
                                      </a>
                                    ) : item.variation && item.variation.length > 0 ? (
                                      <Link to={`${process.env.PUBLIC_URL}/shop/${item.id}`}>
                                        Select Option
                                      </Link>
                                    ) : item.stock && item.stock > 0 ? (
                                      <button
                                        onClick={() => addToCart(item, addToast)}
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
                                        Out of Stock
                                      </button>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Price</th>
                            {compareItems.map((item, key) => {
                              const discountedPrice = getDiscountPrice(
                                item.price,
                                item.discount
                              );
                              const finalProductPrice = (
                                item.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              return (
                                <td className="product-price" key={key}>
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol + finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol + finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol + finalProductPrice}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Description</th>
                            {compareItems.map((item, key) => (
                              <td className="product-desc" key={key}>
                                <p>{item.description || "N/A"}</p>
                              </td>
                            ))}
                          </tr>

                          <tr>
                            <th className="title-column">Rating</th>
                            {compareItems.map((item, key) => (
                              <td className="product-rating" key={key}>
                                <Rating ratingValue={item.rating} />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in compare <br />
                      <Link to={process.env.PUBLIC_URL + "/shop"}>Add Items</Link>
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

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  fetchCompareData: PropTypes.func,
  removeCompareData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartItems: state.cartData,
  compareItems: state.compareItems.compareItems,
  currency: state.currencyData,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item, addToast) => {
    dispatch(addToCart(item, addToast));
  },
  fetchCompareData: (user, addToast) => {
    dispatch(fetchCompareData(user, addToast));
  },
  removeCompareData: (item, addToast) => {
    dispatch(removeCompareData(item, addToast));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
