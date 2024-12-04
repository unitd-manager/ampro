import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Rating from "../product/sub-components/ProductRating";
import imageBase from "../../constants/imageBase";


const OrderListSingle = ({
  product,
  sliderClassName,
  spaceBottomClass,
  currency,
  titlePriceClass,
}) => {
  const { addToast } = useToasts();
  const [user, setUser] = useState();
  console.log("order", product);

  product.images = String(product.images).split(",");

  useEffect(() => {
    const userData = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    const userInfo = JSON.parse(userData);
    setUser(userInfo);
  }, []);

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link
              to={process.env.PUBLIC_URL + "/product/" + product.product_id}
            >
              <img
                className="default-img"
                src={`${imageBase}${product.images[0]}`}
                alt=""
                style={{ height: "200px" }}
              />
              {product.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={`${imageBase}${product.images[1]}`}
                  alt=""
                  style={{ height: "200px" }}
                />
              ) : (
                ""
              )}
            </Link>
          </div>
          <div className="product-content text-center">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h3>
                <Link
                  to={process.env.PUBLIC_URL + "/product/" + product.product_id}
                >
                  <span className="product-name">{product.item_title}</span>
                </Link>
              </h3>

              <div className="price-2">
              <span>
                  Price :
                </span>
                <span>
                  {currency.currencySymbol + product.qty * product.unit_price}{" "}
                </span>
              </div>
            </div>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price"></div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/order-detail/" +
                      product.order_id
                    }
                  >
                    <img
                      className="default-img img-fluid"
                      src={`${imageBase}${product.images[0]}`}
                      alt=""
                      style={{ height: "250px",width:'250px' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-3">
              <div className="shop-list-content">
                <div
                  className={`title-price-wrap-2 ${
                    titlePriceClass ? titlePriceClass : ""
                  }`}
                >
                  <h3>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/order-detail/" +
                        product.order_id
                      }
                    >
                      <span className="product-name">{product.item_title}</span>
                    </Link>
                  </h3>

                 
                </div>

              
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-xl-5 col-md-1 col-sm-1">
              <div className="shop-list-content">
                <div className="price-2">
                  <span>Price :</span>
                  <span>
                    {currency.currencySymbol + product.qty * product.unit_price}{" "}
                  </span>
                </div>
                <div className="price-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/order-detail/" +
                      product.order_id
                    }
                  >
                  Order Date :  <span>{product.order_date}</span>
                  </Link>
                </div>

                <div className="price-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/order-detail/" +
                      product.order_id
                    }
                  >
                  Delivery Date :  <span>{product.delivery_date}</span>
                  </Link>
                </div>
                
                {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-xl-5 col-md-1 col-sm-1">
              <div className="shop-list-content">
                <div className="price-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/order-detail/" +
                      product.order_id
                    }
                  >
                  payment :  <span>{product.order_status}</span>
                  </Link>
                </div>
                <div className="price-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/order-detail/" +
                      product.order_id
                    }
                  >
                  Delivery :  <span>{product.delivery_status}</span>
                  </Link>
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* product modal */}
    </Fragment>
  );
};

OrderListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  titlePriceClass: PropTypes.string,
};

export default OrderListSingle;
