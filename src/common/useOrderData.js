import React, { useState, useEffect } from "react";
import { getProductsByCategory, getProductsBySearch } from "./orderUtils";

export default function useOrderData(productData, category, query) {
  const [data, setData] = useState(productData);

  useEffect(() => {
    const product = query
      ? getProductsBySearch(query)
      : getProductsByCategory(category);
    setData(product);
    setData(product);
  }, [category, query]);

  return data;
}
