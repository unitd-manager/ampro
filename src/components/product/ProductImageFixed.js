import PropTypes from "prop-types";
import React from "react";
import imageBase from "../../constants/imageBase";

const ProductImageFixed = ({ product,productImages }) => {
  return (
    <div className="product-large-image-wrapper">
      {product.discount_percentage || product.latest ? (
        <div className="product-img-badges">
          {product.discount_percentage ? (
            <span className="pink">{product.discount_percentage}%</span>
          ) : (
            ""
          )}
          {product.latest ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {productImages ? (
          <img
          src={`${imageBase}${productImages[0].name}`}
            alt=""
            className="img-fluid"
          
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
