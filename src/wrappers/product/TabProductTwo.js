import PropTypes from "prop-types";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";
import api from "../../constants/api";

const TabProductTwo = ({ spaceTopClass,spaceBottomClass, category }) => {
const[newProducts,setNewProducts]=useState([]);
const[bestSellingProducts,setBestSellingProducts]=useState([]);
const[mostPopularProducts,setMostPopularProducts]=useState([]);

useEffect(()=>{
api.get('/product/getNewProducts').then((res)=>{
  setNewProducts(res.data.data)
}).catch(err=>{console.log(err)})
api.get('/product/getBestSellingProducts').then((res)=>{
  setBestSellingProducts(res.data.data)
}).catch(err=>{console.log(err)})
api.get('/product/getMostPopularProducts').then((res)=>{
  setMostPopularProducts(res.data.data)
}).catch(err=>{console.log(err)})
},[])
  return (
    <div
    className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
      spaceBottomClass ? spaceBottomClass : ""
    }`}
  >
    {/* <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}> */}
      <div className="container">
        <SectionTitle titleText="Top Products!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Most Popular</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row three-column">
                <ProductGridTwo
                products={newProducts}
                  // category={category}
                  type="new"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row three-column">
                <ProductGridTwo
                products={bestSellingProducts}
                  // category={category}
                  type="bestSeller"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row three-column">
                <ProductGridTwo
                products={mostPopularProducts}
                  // category={category}
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
  spaceBottomClass: PropTypes.string
};

export default TabProductTwo;
