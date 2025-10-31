import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import { Col, Row } from "reactstrap";
import imageBase from "../../constants/imageBase";

const BlogFeaturedSingle = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    api.get("/blog/getHomeBlog").then((res) => {
      setBlogs(res.data.data);
    });
  }, []);

  return (
    <div className="col-lg-12 col-sm-12">
      <Row>
        {blogs &&
          blogs.map((data) => (
            <Col md={4} key={data.blog_id}>
              <div className="blog-wrap mb-30 scroll-zoom">
                <div className="blog-img">
                  <Link
                    to={`/blog-details/${data.blog_id}/${data.title}`}
                    state={{ data }}
                  >
                    <img
                      src={`${imageBase}${data.file_name}`}
                      className="irounded-sm img-fluid w-100 mb-5"
                      alt="post-thumb"
                      style={{ height: "250px", width: "250px" }}
                    />
                  </Link>
                </div>
                <div className="blog-content-wrap">
                  <div className="blog-content text-center">
                    <h3>
                      <Link
                        to={`/blog-details/${data.blog_id}/${data.title}`}
                        state={{ data }}
                      >
                        {data.title}
                      </Link>
                    </h3>
                    <span>
                      By{" "}
                      <Link
                        to={`/blog-details/${data.blog_id}/${data.title}`}
                        state={{ data }}
                      >
                        {data.author}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.object, // You may remove this if not used
};

export default BlogFeaturedSingle;
