import PropTypes from "prop-types";
import React,{useState,useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import ProductReviewTab from "../../components/product/ProductReviewTab";
import api from "../../constants/api";

const ProductDescriptionTab = ({ spaceBottomClass, product,comments }) => {
const {id}=useParams();
 
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews({comments&& comments.length})</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                 
                  {product.product_description}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {product.description}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                {comments && 
                  <ProductReviewTab comments={comments}/>
               }
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  comments:PropTypes.array
};

export default ProductDescriptionTab;
