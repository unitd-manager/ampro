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
import useOrderData from "../../common/useOrderData";
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
  const [user, setUser] = useState({});

  const location = useLocation();
  const history = useHistory();

  console.log("search", searchQuery);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("search");
    if (query) {
      setSearchQuery(query);
      api
        .post(`/orders/getOrderHistoryBySearch`, {
          keyword: query,
          contact_id: user.contact_id,
        })
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .post("/orders/getOrderHistoryByContactId", {
          contact_id: user.contact_id,
          
        })
        .then((res) => {
          setOrders(res.data.data);
          console.log("orders", res.data.data);
        })
        .catch((err) => console.log(err));
    }
    console.log("searchquery", query);
  }, [location]);

  const data = useOrderData(
    orders
    // category,
    // router.query.q
  );

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = getUser();

    if (userData) {
      api
        .post("/orders/getOrderHistoryByContactId", {
          contact_id: userData.contact_id,
        })
        .then((res) => {
          setOrders(res.data.data);
          console.log("orders", res.data.data);
        })
        .catch((err) => console.log(err));

      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const filter = async () => {
      let sortedProducts = await getSortedOrders(
        orders,
        user,
        sortType,
        sortValue
      );
      const filterSortedProducts = getSortedOrders(
        sortedProducts,
        filterSortType,
        filterSortValue
      );

      sortedProducts = filterSortedProducts;
      console.log("sorted orders", sortedProducts);
      setSortedProducts(sortedProducts);
      setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    };
    filter();
  }, [offset, orders, sortType, sortValue, filterSortType, filterSortValue]);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`?search=${searchQuery}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Orders</title>
        <meta
          name="description"
          content="Shop page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Orders
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 order-2 order-lg-1">
                {/* shop sidebar */}
                <OrderSidebar
                  products={orders}
                  getSortParams={getSortParams}
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchChange={handleSearchChange}
                  sideSpaceClass="mr-10"
                />
              </div>
              <div className="col-lg-10 order-1 order-lg-2">
                {/* shop topbar default */}
                <OrderTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <OrderLists layout={layout} products={currentData} />

                {/* shop product pagination */}
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

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Orders);
