import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedOrders } from "../../helpers/product";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useHistory } from "react-router-dom";
import OrderSidebar from "../../components/orders/orderSidebar";
import OrderTopbar from "../../components/orders/orderTopbar";
import OrderLists from "../../components/orders/orderLists";
import api from "../../constants/api";
import { getUser } from "../../common/user";

const Orders = ({ products }) => {
  const [layout, setLayout] = useState("list");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  const location = useLocation();
  const history = useHistory();
  const pageLimit = 15;
  const { pathname } = location;

  // ✅ Load user and default orders on mount
  useEffect(() => {
    const userData = getUser();
    if (userData?.contact_id) {
      setUser(userData);
      api
        .post("/orders/getOrderHistoryByContactId", {
          contact_id: userData.contact_id,
        })
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // ✅ Search-based orders fetch
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (!user.contact_id) return;

    if (query) {
      setSearchQuery(query);
      api
        .post("/orders/getOrderHistoryBySearch", {
          keyword: query,
          contact_id: user.contact_id,
        })
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .post("/orders/getOrderHistoryByContactId", {
          contact_id: user.contact_id,
        })
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [location, user.contact_id]);

  // ✅ Sorting and pagination logic
  useEffect(() => {
    const filter = async () => {
      if (!orders.length) return;

      let sorted = await getSortedOrders(orders, user, sortType, sortValue);
      sorted = getSortedOrders(sorted, filterSortType, filterSortValue);

      setSortedProducts(sorted);
      setCurrentData(sorted.slice(offset, offset + pageLimit));
    };
    filter();
  }, [offset, orders, sortType, sortValue, filterSortType, filterSortValue, user]);

  // ✅ Handlers
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`?search=${searchQuery}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (type, value) => {
    setSortType(type);
    setSortValue(value);
  };

  const getFilterSortParams = (type, value) => {
    setFilterSortType(type);
    setFilterSortValue(value);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Orders</title>
        <meta name="description" content="Order history page of Ampro eCommerce." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Orders</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
              <div className="col-lg-2 order-2 order-lg-1">
                <OrderSidebar
                  products={orders}
                  getSortParams={getSortParams}
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchChange={handleSearchChange}
                  sideSpaceClass="mr-10"
                />
              </div>

              {/* Main Content */}
              <div className="col-lg-10 order-1 order-lg-2">
                <OrderTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                <OrderLists layout={layout} products={currentData} />

                {/* Pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Orders.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: state.productData.products,
});

export default connect(mapStateToProps)(Orders);
