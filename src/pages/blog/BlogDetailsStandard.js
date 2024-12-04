import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import api from "../../constants/api";
import BlogPost from "../../wrappers/blog/BlogPost";

const BlogDetailsStandard = ({ location }) => {
  const { pathname } = location;
  const { id } = useParams();
  const [editBlog, setEditBlog] = useState({});
  const [blogImages, setBlogImages] = useState([]);
  useEffect(() => {
    api
      .post("/blog/getBlogById", { blog_id: id })
      .then((res) => {
        setEditBlog(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .post("/file/getListOfFiles", {
        record_id: id,
        room_name: "Blog",
      })
      .then((res) => {
        setBlogImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Fragment>
      <div className={`blog-area`}>
        <MetaTags>
          <title>UnitdEcom | Blog Page</title>
          <meta
            name="description"
            content="Product page of UnitdEcom react minimalist eCommerce template."
          />
        </MetaTags>

        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Blog Page
        </BreadcrumbsItem>

        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />

          {/*BlogPost */}
          <BlogPost editBlog={editBlog} blogImages={blogImages} />

          {/* related product slider */}
        </LayoutOne>
      </div>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
};

export default BlogDetailsStandard;
