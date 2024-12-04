import React from "react";
import PropTypes from "prop-types";

const BlogSearch = ({ handleSearchSubmit, handleSearchChange }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input
            type="text"
            placeholder="Search here..."
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

BlogSearch.propTypes = {
  handleSearchSubmit: PropTypes.func,
  handleSearchChange: PropTypes.func,
};

export default BlogSearch;
