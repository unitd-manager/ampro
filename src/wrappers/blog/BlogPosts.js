import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import imageBase from "../../constants/imageBase";

const BlogPosts = ({ products, layout }) => {
  return (
    <Fragment>
      {products &&
        products.map((data) => (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="blog-wrap-2 mb-30">
              <div className="blog-img-2">
                <Link
                   to={process.env.PUBLIC_URL + `/blog-details/${data.blog_id}/${data.title}`}
                  state={{ data: data }}
                >
                  <img
                    src={`${imageBase}${data.file_name}`}
                    className="irounded-sm img-fluid w-100 mb-5"
                    alt="post-thumb"
                    style={{ height: "250px", width: "250px" }}
                  />
                </Link>
              </div>
              <div className="blog-content-2">
                <div className="blog-meta-2">
                  <ul>
                    <li>{data.date}</li>
                  </ul>
                </div>
                <h4>
                  <Link
                    to={
                      process.env.PUBLIC_URL + `/blog-details/${data.blog_id}/${data.title}`
                    }
                  >
                    {data.title}
                  </Link>
                </h4>

                <div className="blog-share-comment">
                  <div className="blog-btn-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL + `/blog-details/${data.blog_id}/${data.title}`
                    }
                  >
                      read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default BlogPosts;
