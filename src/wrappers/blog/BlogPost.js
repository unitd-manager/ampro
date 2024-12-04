import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import imageBase from "../../constants/imageBase";

export default function BlogPost({ editBlog, blogImages }) {
  BlogPost.propTypes = {
    editBlog: PropTypes.object,
    blogImages: PropTypes.any,
  };
console.log('blogimages',blogImages)
  
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          {/* {blogImages &&
            blogImages.map((data) => (
              <img
                src={`${imageBase}${data.name}`}
                className="irounded-sm img-fluid w-100 mb-5"
                alt="post-thumb"
              />
            ))} */}
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <span>{editBlog && editBlog.date} </span>
         
            </ul>
          </div>
          <h3>
            <span>{editBlog && editBlog.title} </span>
          </h3>
          <p>
            <span>{ReactHtmlParser(editBlog && editBlog.description)} </span>
          </p>
        </div>
      </div>

      <div className="tag-share">
        <div className="blog-share">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li>
                <a className="facebook" href="//facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="//twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a className="instagram" href="//instagram.com">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
