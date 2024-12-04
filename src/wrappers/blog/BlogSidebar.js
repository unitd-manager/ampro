import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import api from "../../constants/api";
import BlogSearch from "./BlogSearch";
import BlogCategory from "../../pages/blog/BlogCategory";

const BlogSidebar = ({
  getSortParams,
  sideSpaceClass,
  handleSearchSubmit,
  handleSearchChange,
}) => {
  const [blogs, setblog] = useState();
  const [categories, setCategories] = useState();
  const { id } = useParams();

  const getblogs = () => {
    api
      .get("/blog/getBlogImage", blogs)
      .then((res) => {
        setblog(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    api
      .get("/category/getAllBlogCategory")
      .then((res) => {
        setCategories(res.data.data);
        // return message.error("Registered Successfully ");
      })
      .catch((err) => {
        console.log(err);
      });
    getblogs();
  }, []);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <BlogSearch
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
      />

      {/* filter by categories */}
      <BlogCategory categories={categories} getSortParams={getSortParams} />
    </div>
  );
};
BlogSidebar.propTypes = {
  getSortParams: PropTypes.func,
  categoryblogs: PropTypes.array,
  sideSpaceClass: PropTypes.string,
  handleSearchSubmit: PropTypes.func,
  handleSearchChange: PropTypes.func,
};
export default BlogSidebar;
