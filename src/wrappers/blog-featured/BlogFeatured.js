import PropTypes from "prop-types";
import React from "react";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../../constants/api";
import { useState } from "react";

const BlogFeatured = ({ spaceTopClass, spaceBottomClass }) => {

  return (
    <div
    className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
      spaceBottomClass ? spaceBottomClass : ""
    }`}
  >
    <div className="container">
      <SectionTitle
        titleText="OUR BLOG"
        positionClass="text-center"
        spaceClass="mb-55"
      />
      <div className="row">
   
     
            <BlogFeaturedSingle />
         
      </div>
    </div>
  </div>
);
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BlogFeatured;
