import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const OrderSearch = ({handleSearchSubmit,handleSearchChange}) => {
const history=useHistory();
  const [search, setSearch] = useState("");

  const onSelectOption = (value) => {
    setSearch(value);

  };

  
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

export default OrderSearch;
