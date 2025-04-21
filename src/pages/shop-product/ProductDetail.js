import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import api from "../../constants/api";
import LottieComponent from "../../components/LottieComponent";
import { getUser } from "../../common/user";

const ProductDetail = ({ location, product }) => {
  const { pathname } = location;
  const { id,title } = useParams();
  const [foundProduct, setFoundProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  
  const [comments, setComments] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // const foundProduct = getProductsBySlug(productData, slug);
  console.log("products", foundProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .post("/product/getProductbyproductId", { product_id: id })
      .then((res) => {
        res.data.data[0].tag = String(res.data.data[0].tag).split(",");
        res.data.data[0].grades = String(res.data.data[0].grades).split(",");
        res.data.data[0].images = String(res.data.data[0].images).split(",");
        setFoundProduct(res.data.data[0]);
        api
          .post("/product/getProductbyCategoryId", {
            category_id: res.data.data[0].category_id,
          })
          .then((resp) => {
            const relateds=resp.data.data.filter((el)=>{return el.product_id !=res.data.data[0].product_id})
            setRelatedProducts(relateds);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    const user=getUser();
    api
      .post("/comment/getcommentsByProductId", {
        record_id: id,
        room_name: "product",
      })
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

      api
      .post("/enquiry/getEnqProdByContactId", {
        contact_id: user?.contact_id
      })
      .then((res) => {
        setOrderedProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Product Page</title>
        <meta
          name="description"
          content="Product page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {loading && (
          <>
            <LottieComponent />
          </>
        )}
        {!loading && (
          <>
            {" "}
            {/* product description with image */}
            <ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={foundProduct}
              productImages={productImages}
              comments={comments}
              galleryType="leftThumb"
            />
            {/* product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              product={foundProduct}
              orderedProducts={orderedProducts}
              comments={comments}
            />
            {/* related product slider */}
            <RelatedProductSlider
              products={relatedProducts}
              spaceBottomClass="pb-95"
            />
          </>
        )}
      </LayoutOne>
    </Fragment>
  );
};

ProductDetail.propTypes = {
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

export default connect(mapStateToProps)(ProductDetail);
