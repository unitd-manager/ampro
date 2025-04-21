import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridThree from "./ProductGridBest";


const TabProductTwo = ({ spaceBottomClass, bestSellingProducts }) => {
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitle titleText="Best Seller" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Tab.Content>
            <Tab.Pane eventKey="bestSeller">
              <div className="row custom-product-grid">
                <ProductGridThree
                                 products={bestSellingProducts}
                                 type="saleItems"
                                 limit={8}
                                 spaceBottomClass="mb-25"
                               />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 col-12">
          <Link className="loadMore6" to={process.env.PUBLIC_URL + "/shop"}>
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  bestSellingProducts: PropTypes.array
};

export default TabProductTwo;
