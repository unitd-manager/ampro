import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import { Col, Row } from "reactstrap";
import imageBase from "../../constants/imageBase";

const BlogFeaturedSingle = ({}) => {
  const [blogs, setBlogs] = useState();
  const getBlog = () => {
    api.get("/blog/getHomeBlog", blogs).then((res) => {
      setBlogs(res.data.data);
    });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="col-lg-12 col-sm-12">
      <Row>
        {blogs &&
          blogs.map((data) => (
            <Col md={4}>
              <div className="blog-wrap mb-30 scroll-zoom">
                <div className="blog-img">
                  <Link
                    to={
                      process.env.PUBLIC_URL + `/blog-details/${data.blog_id}/${data.title}`
                    }
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

                <div className="blog-content-wrap">
                  <div className="blog-content text-center">
                    <h3>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          `/blog-details/${data.blog_id}/${data.title}`
                        }
                        state={{ data: data }}
                      >
                        {data.title}
                      </Link>
                    </h3>
                    <span>
                      By{" "}
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          `/blog-details/${data.blog_id}/${data.title}`
                        }
                        state={{ data: data }}
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
  singlePost: PropTypes.object,
};

export default BlogFeaturedSingle;
