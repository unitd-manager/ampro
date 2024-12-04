import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescriptionnew";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import api from "../../constants/api";

const ProductTabLeft = ({ location }) => {
  const { pathname } = location;
  const { id } = useParams();
  const [foundProduct, setFoundProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // const foundProduct = getProductsBySlug(productData, slug);
  console.log("products", foundProduct);

  useEffect(() => {
    api
      .post("/product/getProductbyproductId", { product_id: id })
      .then((res) => {
        res.data.data[0].tag = String(res.data.data[0].tag).split(",");
        res.data.data[0].images = String(res.data.data[0].images).split(",");
        setFoundProduct(res.data.data[0]);
        api
          .post("/product/getProductbyCategoryId", {
            category_id: res.data.data[0].category_id,
          })
          .then((res) => {
            setRelatedProducts(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .post("/file/getListOfFiles", { record_id: id, room_name: "product" })
      .then((res) => {
        setProductImages(res.data);
        console.log("image", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <Fragment>
      <MetaTags>
        <title>UnitdEcom | Product Details</title>
        <meta
          name="description"
          content="Product page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Product Detail
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={foundProduct}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          product={foundProduct}
          // productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          product={relatedProducts}
          // category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(ProductTabLeft);
