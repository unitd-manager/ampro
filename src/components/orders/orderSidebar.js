import PropTypes from "prop-types";
import React, {  useState } from "react";

import OrderSearch from "./orderSearch";
import OrderCategories from "./orderCategories";
import OrderStatusFilter from "./orderStatusFilter";

const OrderSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  handleSearchSubmit,
  handleSearchChange,
}) => {
  const [categories, setCategories] = useState([
    {
      category_id: 2,
      category_title: "Last 30 days",
    },
    {
      category_id: 3,
      category_title: "Last 60 days",
    },
    {
      category_id: 4,
      category_title: "Last 3 months",
    },
    {
      category_id: 5,
      category_title: "Last 6 months",
    },
    {
      category_id: 6,
      category_title: "This Year",
    },
  ]);
  const [statuses, setStatuses] = useState([
    {
      category_id: 1,
      category_title: "New",
    },
    {
      category_id: 2,
      category_title: "Due",
    },
    {
      category_id: 3,
      category_title: "Paid",
    },
  ]);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <OrderSearch
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
      />

      {/* filter by categories */}
      <OrderStatusFilter categories={statuses} getSortParams={getSortParams} />
      <br />
      <br />
      {/* filter by categories */}
      <OrderCategories categories={categories} getSortParams={getSortParams} />
    </div>
  );
};

OrderSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default OrderSidebar;
