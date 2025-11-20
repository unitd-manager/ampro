import React from "react";
import PropTypes from "prop-types";

const ShopSearch = ({handleSearchSubmit,handleSearchChange, searchQuery}) => {
// const history=useHistory();
//   const [search, setSearch] = useState("");

//   const onSelectOption = (value) => {
//     setSearch(value);

//   };

//   const onSearch = () => {
//     if (!search || search === "") {
//       history.push("/");
//     } else {
//       history.push(`/shop/search/${search}`)
//     }
//   };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            name="search"
            placeholder="Search here..." 
            value={searchQuery || ""}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(e);
              }
            }}
          />
          <button type="submit">
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

ShopSearch.propTypes = {
  handleSearchSubmit:PropTypes.func,
  handleSearchChange:PropTypes.func,
  searchQuery: PropTypes.string
};

export default ShopSearch;
