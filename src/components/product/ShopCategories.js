import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SubcategoriesTree from "./ShopSubCategories";

const ShopCategories = ({ 
  categories, subcategories, subcategoryTypes, getSortParams 
}) => {

  const history = useHistory();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoryTypes, setSelectedSubCategoryTypes] = useState([]);

  // -------------------------------
  // 🔥 1. Update URL when user clicks
  // -------------------------------
  const updateURL = (categoryId) => {
    if (!categoryId) {
      history.push("/shop");
    } else {
      history.push(`/shop?category_id=${categoryId}`);
    }
  };

  const handleCategorySelection = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setSelectedSubCategories([]);
      setSelectedSubCategoryTypes([]);
      getSortParams("category", "");
      updateURL(null);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubCategories([]);
      setSelectedSubCategoryTypes([]);
      getSortParams("category", categoryId);
      updateURL(categoryId);
    }
  };

  // --------------------------------------------------------
  // 🔥 2. Auto-load category from URL on first page load
  // --------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category_id");

    if (urlCategory) {
      const id = parseInt(urlCategory, 10);

      // auto select checkbox
      setSelectedCategory(id);

      // trigger sorting
      getSortParams("category_id", id);
    }
  }, [location.search, getSortParams]); // runs only when URL changes

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories</h4>

      <div className="sidebar-widget-list mt-30">
        {categories.length > 0 ? (
          <ul>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubCategories([]);
                  setSelectedSubCategoryTypes([]);
                  getSortParams("category", "");
                  updateURL(null);
                }}
              >
                Clear All
              </button>
            </li>

            {categories.map((category) => (
              <li key={category.category_id}>
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    value={category.category_id}
                    checked={selectedCategory === category.category_id}
                    onChange={() => handleCategorySelection(category.category_id)}
                  />
                  <span className="checkmark"></span> {category.category_title}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>

      {/* Auto load subcategories when URL has category */}
      {selectedCategory && (
        <div className="mt-3">
          <SubcategoriesTree
            categoryId={selectedCategory}
            selectedCategory={selectedCategory}
            subcategories={subcategories}
            subcategoryTypes={subcategoryTypes}
            selectedSubCategories={selectedSubCategories}
            setSelectedSubCategories={setSelectedSubCategories}
            selectedSubCategoryTypes={selectedSubCategoryTypes}
            setSelectedSubCategoryTypes={setSelectedSubCategoryTypes}
            getSortParams={getSortParams}
          />
        </div>
      )}
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
  subcategoryTypes: PropTypes.array.isRequired,
  getSortParams: PropTypes.func.isRequired,
};

export default ShopCategories;
