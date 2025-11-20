import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import api from "../../constants/api";
 
const Shop = ({}) => {
  const [layout, setLayout] = useState('grid three-column');
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [sortarray, setSortArray] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState(0); // Force re-render key

  const location = useLocation();
  const history = useHistory();

  console.log("search", searchQuery);
  useEffect(() => {
    console.log("=== URL CHANGE DETECTED ===");
    console.log("Current URL:", location.search);
    
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("search");
    const cate = urlSearchParams.get("category");
    
    console.log("Extracted query:", query);
    console.log("Extracted category:", cate);

    // Reset states
    setProducts([]);
    setSearchQuery("");
    //setSelectedCategories("");

    if (query && cate) {
      setSearchQuery(query);
      setSelectedCategories(cate);
      api.post(`/category/getProductByCategory`, { category_id: cate })
        .then((res) => {
          const catList = res?.data?.data || [];

          // Client-side filtering for search term on category products
          const searchTerm = query.toLowerCase();
          const finalFiltered = catList.filter(product => {
            const productTitle = (product.title || '').toLowerCase();
            const productDescription = (product.description || '').toLowerCase();
            const productTag = (product.tag || product.tag_no || '').toString().toLowerCase();
            const productCode = (product.product_code || '').toLowerCase();

            return productTitle.includes(searchTerm) ||
                   productDescription.includes(searchTerm) ||
                   productTag.includes(searchTerm) ||
                   productCode.includes(searchTerm);
          });

          console.log("Combined search and category results:", finalFiltered.length, "products");
          setProducts(finalFiltered);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    } else if (query) {
      console.log("=== PROCESSING SEARCH QUERY ===", query);
      setSearchQuery(query);
      api
        .post(`product/getProductsbySearch`, { keyword: query })
        .then((res) => {
          console.log("Raw API response:", res);
          const searchResults = res.data.data || [];
          console.log("Search API returned:", searchResults.length, "products");
          console.log("First few products from API:", searchResults.slice(0, 5).map(p => ({title: p.title, product_id: p.product_id})));
          
          // Check if the API is actually filtering or returning all products
          const containsSearchTerm = searchResults.some(product => {
            const searchTerm = query.toLowerCase();
            const productTitle = (product.title || '').toLowerCase();
            return productTitle.includes(searchTerm);
          });
          
          console.log("Does API result contain search term?", containsSearchTerm);
          
          // Client-side filtering to ensure search works correctly
          const filteredResults = searchResults.filter(product => {
            const searchTerm = query.toLowerCase();
            const productTitle = (product.title || '').toLowerCase();
            const productDescription = (product.description || '').toLowerCase();
            const productTag = (product.tag || product.tag_no || '').toString().toLowerCase();
            const productCode = (product.product_code || '').toLowerCase();
            
            const titleMatch = productTitle.includes(searchTerm);
            const descMatch = productDescription.includes(searchTerm);
            const tagMatch = productTag.includes(searchTerm);
            const codeMatch = productCode.includes(searchTerm);
            
            const matches = titleMatch || descMatch || tagMatch || codeMatch;
            
            if (matches) {
              console.log(`MATCHED - Product: ${product.title}, Search term: ${searchTerm}, Title match: ${titleMatch}, Desc match: ${descMatch}, Tag match: ${tagMatch}, Code match: ${codeMatch}`);
            }
            return matches;
          });
          
          console.log("After client-side filtering:", filteredResults.length, "products");
          console.log("Filtered products:", filteredResults.map(p => ({title: p.title, product_id: p.product_id})));
          
          setProducts(filteredResults);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    } else if (cate) {
      setSelectedCategories(cate);
      api.post(`/category/getProductByCategory`, { category_id: cate })
        .then((res) => {
          setProducts(res.data.data || []);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    } else {
      api
        .get("/product/getAllProducts")
        .then((res) => {
          const productsWithTags = res.data.data.map((element) => ({
            ...element,
            tag: String(element.tag).split(","),
          }));
          setProducts(productsWithTags);
          setAllProducts(productsWithTags);
        })
        .catch(() => {
          console.log("error");
          setProducts([]);
        });
    }
  }, [location.search]);
  

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue,sortarray) => {
    console.log('selectedCategories getparams');
    setSortType(sortType);
    setSortValue(sortValue);
    if (sortType === "category") {
      setSelectedCategories(sortValue);
    }
    setSortArray(sortarray);
    console.log("sortType", sortType);
    console.log("sortvalue", sortValue);
  };
  

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };
console.log('selectedCategories',selectedCategories);
  useEffect(() => {
    console.log("=== FILTERING EFFECT TRIGGERED ===");
    console.log("Input products count:", products?.length);
    console.log("Products sample:", products?.slice(0, 2).map(p => p.title));
    console.log("Sort type/value:", sortType, sortValue);
    console.log("Filter sort type/value:", filterSortType, filterSortValue);
    
    const filter = async () => {
      let sortedProducts = products || [];
      console.log("Starting with products:", sortedProducts.length);
      
      // Only apply getSortedProducts if we have sort parameters
      if (sortType && sortValue) {
        console.log("Applying getSortedProducts with:", sortType, sortValue);
        sortedProducts = await getSortedProducts(products, sortType, sortValue, sortarray);
        console.log("After getSortedProducts:", sortedProducts.length);
      }
      
      // Apply additional filtering if needed
      if (filterSortType && filterSortValue) {
        console.log("Applying additional filtering:", filterSortType, filterSortValue);
        const filterSortedProducts = await getSortedProducts(
          sortedProducts,
          filterSortType,
          filterSortValue,
          sortarray
        );
        sortedProducts = filterSortedProducts;
        console.log("After additional filtering:", sortedProducts.length);
      }
      
      console.log("Final sorted products count:", sortedProducts.length);
      console.log("Final products sample:", sortedProducts.slice(0, 3).map(p => p.title));
      
      setSortedProducts(sortedProducts);
      setCurrentData(sortedProducts?.slice(offset, offset + pageLimit) || []);
    };
    filter();
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, sortarray]);

const handleSearchSubmit = (event) => {
  event.preventDefault();

  setIsLoading(true);
  setOffset(0);
  setCurrentPage(1);

  // Ensure we read the latest value from the form input to avoid stale state
  let inputVal = "";
  try {
    const formEl = event.target.closest('form') || event.target.form || null;
    if (formEl) {
      const inputEl = formEl.querySelector('input[type="text"], input');
      if (inputEl && typeof inputEl.value === 'string') {
        inputVal = inputEl.value;
      }
    }
  } catch (e) {
    // ignore
  }
  const queryVal = (inputVal || searchQuery || '').trim();

  const params = new URLSearchParams();
  if (queryVal) params.set("search", queryVal);
  if (selectedCategories) params.set("category", selectedCategories);

  // IMPORTANT: use push not replace
  history.push(`?${params.toString()}`);

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => setIsLoading(false), 300);
  setSearchKey(prev => prev + 1);
};

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Shop Page</title>
        <meta
          name="description"
          content="Shop page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100" key={searchKey}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-1 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                  products={allProducts}
                  getSortParams={getSortParams}
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchChange={handleSearchChange}
                  searchQuery={searchQuery}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-2 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={sortedProducts?.length || 0}
                  sortedProductCount={currentData?.length || 0}
                />
                {/* shop page content default */}
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3">Searching products...</p>
                  </div>
                ) : (
                  <ShopProducts layout={layout} products={currentData} />
                )}

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts?.length}
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

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Shop);
