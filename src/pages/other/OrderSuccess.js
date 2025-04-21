import React, { Fragment } from "react";
import LayoutOne from "../../layouts/Layout";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Order-Success</title>
        <meta
          name="description"
          content="Shop page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Orders
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <div className="order-suc-body">
          <div class="card">
            <div
              style={{
                borderRadius: "200px",
                height: "200px",
                width: "200px",
                background: "#F8FAF5",
                margin: "0 auto",
              }}
            >
              <i className="checkmark order-i">✓</i>
            </div>
            <h1 className="order-h">Success</h1>
            <p className="order-p">
              Your Order has been Placed successfully;
              <br /> Thanks for Your Order!
            </p>
          </div>
        </div>

        {/* Additional content or components specific to the success page */}
      </LayoutOne>
    </Fragment>
  );
};

export default OrderSuccessPage;
