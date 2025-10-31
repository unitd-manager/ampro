import React from "react";

const OrderSearch = ({ handleSearchSubmit, handleSearchChange }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search</h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form
          className="pro-sidebar-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Search here..."
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSearch;
