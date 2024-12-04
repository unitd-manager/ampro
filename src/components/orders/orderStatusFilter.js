import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const OrderStatusFilter = ({ categories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Order Status </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("status", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("status", category.category_title);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.category_title}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

OrderStatusFilter.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default OrderStatusFilter;
