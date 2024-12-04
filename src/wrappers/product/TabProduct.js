import PropTypes from "prop-types";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridThree from "./ProductGridThree";
import api from "../../constants/api";


const TabProductTwo = ({ spaceBottomClass, category,newProducts,bestSellingProducts,mostPopularProducts }) => {

  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitle titleText="Top Products!" positionClass="text-center" />
        <Tab.Container defaultActiveKey={newProducts.length>0?"newArrival":bestSellingProducts.length>0?"bestSeller":mostPopularProducts.length>0 ?"saleItems":"bestSeller"}>
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
           {newProducts.length>0 && <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>}
           {bestSellingProducts.length>0 &&  <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>}
            {mostPopularProducts.length>0 && <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Most Popular</h4>
              </Nav.Link>
            </Nav.Item>}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row three-column">
                <ProductGridThree
                products={newProducts}
                  type="new"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row three-column">
                <ProductGridThree
                products={bestSellingProducts}
                  type="bestSeller"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row three-column">
                <ProductGridThree
                products={mostPopularProducts}
                  type="saleItems"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductTwo.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  newProducts:PropTypes.array,
  bestSellingProducts:PropTypes.array,
  mostPopularProducts:PropTypes.array
};

export default TabProductTwo;
