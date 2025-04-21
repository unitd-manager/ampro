import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridThree from "./ProductGrid";

const TabProductTwo = ({ spaceBottomClass, mostPopularProducts }) => {
  return (
    <div className={`shop-top-bar mt-35 ml-30 ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="shop-bottom-area mt-35">
        <SectionTitle titleText="Most Popular" positionClass="text-center" />
        <Tab.Container defaultActiveKey="saleItems">
          <Tab.Content>
            <Tab.Pane eventKey="saleItems">
              <div className="row grid three-column">
                <ProductGridThree
                  products={mostPopularProducts}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
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
  newProducts: PropTypes.array
};

export default TabProductTwo;
