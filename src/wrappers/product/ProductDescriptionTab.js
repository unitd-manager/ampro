import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import DOMPurify from 'dompurify';
// import { useParams } from "react-router-dom/cjs/react-router-dom";
// import ProductReviewTab from "../../components/product/ProductReviewTab";
// import api from "../../constants/api";

const ProductDescriptionTab = ({ spaceBottomClass, orderedProducts,product,comments }) => {
// const {id}=useParams();
 console.log('orderedProducts',orderedProducts);
  //product.product_description = product?.product_description?.replace(/<[^>]*>/g, '');
  product.description = product?.description?.replace(/<[^>]*>/g, '');

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  
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
              {/* <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews({comments&& comments.length})</Nav.Link>
              </Nav.Item> */}
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                 
              <div
  className="product-anotherinfo-wrapper"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(decodeHTML(product.product_description))
  }}
></div>

              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {product.description}
              </Tab.Pane>
              {/* <Tab.Pane eventKey="productReviews">
                {comments && 
                  <ProductReviewTab orderedProducts={orderedProducts} comments={comments}/>
               }
              </Tab.Pane> */}
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
