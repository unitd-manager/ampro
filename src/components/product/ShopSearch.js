import React from "react";
import PropTypes from "prop-types";

const ShopSearch = ({handleSearchSubmit,handleSearchChange}) => {
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
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..." onChange={handleSearchChange} />
          <button onClick={handleSearchSubmit}>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

ShopSearch.propTypes = {
  
  handleSearchSubmit:PropTypes.func,
  handleSearchChange:PropTypes.func
};

export default ShopSearch;
