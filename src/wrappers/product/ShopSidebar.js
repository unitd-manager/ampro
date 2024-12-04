import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {getIndividualTags} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopTag from "../../components/product/ShopTag";
import api from "../../constants/api";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass,handleSearchSubmit,handleSearchChange }) => {

  const uniqueTags = getIndividualTags(products);
const[categories,setCategories]=useState([]);
console.log('products',products)
console.log('tags',uniqueTags);
  useEffect(()=>{
    api.get('/category/getAllCategory').then((res)=>{
     setCategories(res.data.data)
      
          }).catch(err=>{console.log(err)})
  },[])
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange}/>

      {/* filter by categories */}
      <ShopCategories
        categories={categories}
        getSortParams={getSortParams}
      />

 {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
  handleSearchSubmit:PropTypes.func,
  handleSearchChange:PropTypes.func
};

export default ShopSidebar;
