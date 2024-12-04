import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactHtmlParser from 'react-html-parser';

  export default function BlogGrid({ editBlog,blogImages }) {
    BlogGrid.propTypes = {
      editBlog: PropTypes.object,
      blogImages: PropTypes.any,
    };


  return (
    <Fragment>
       <div className="blog-details-top">
        <div className="blog-details-img">
          {blogImages && blogImages.map (data=>(
          <img src={`http://43.228.126.245/united-ecomm-api/storage/uploads/${data.name}`} className="irounded-sm img-fluid w-100 mb-5" alt="post-thumb" /> 
          ))
  }
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
            <span>{editBlog && editBlog.date} </span>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h4><span>{editBlog && editBlog.title} </span></h4>
          <p>
          <span>{ReactHtmlParser(editBlog && editBlog.description)} </span>
          </p>
       
        </div>
      </div>

      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                lifestyle ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                interior ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                outdoor
              </Link>
            </li>
          </ul>
        </div>
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
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          next post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};


