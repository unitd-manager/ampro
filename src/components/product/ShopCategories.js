// import PropTypes from "prop-types";
// import React, { useState } from "react";
// import { setActiveSort } from "../../helpers/product";
// import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import SubcategoriesTree from "./ShopSubCategories";

// const ShopCategories = ({ 
//   categories,
//   selectedCategories,
//   setSelectedCategories,
//   getSortParams,
//   subcategories,
//   subcategoryTypes,
//   selectedSubCategory,
//   setSelectedSubCategory,
//   setSelectedSubCategoryTypes,
//   selectedSubCategoryTypes
// }) => {
//   const history = useHistory();

//   // Handle Category Selection
//   const handleCategorySelection = (categoryId) => {
//     if (selectedCategories === categoryId) {
//       // If already selected, unselect it
//       setSelectedCategories("");
//       getSortParams("category", "");
//     } else {
//       // Select new category
//       setSelectedCategories(String(categoryId)); // Ensure it's a string
//       getSortParams("category", categoryId);
//     }
//   };

//   console.log("Selected Category:", selectedCategories); // Debugging

//   return (
//     <div className="sidebar-widget">
//       <h4 className="pro-sidebar-title">Categories</h4>
//       <div className="sidebar-widget-list mt-30">
//         {categories ? (
//           <ul>
//             <li>
//               <div className="sidebar-widget-list-left">
//                 <button
//                   onClick={() => {
//                     handleCategorySelection("");
//                     setActiveSort();
//                     history.push("/shop");
//                   }}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </li>

//             {categories.map((category) => (
//               <div key={category.category_id}>
//                 <label className="custom-checkbox">
//                   <input
//                     type="checkbox"
//                     value={category.category_id}
//                     checked={selectedCategories === String(category.category_id)}
//                     onChange={() => handleCategorySelection(category.category_id)}
//                   />
//                   <span className="checkmark"></span> {category.category_title}
//                 </label>
//               </div>
//             ))}
//           </ul>
//         ) : (
//           "No categories found"
//         )}
//       </div>
//       {/* {selectedCategory && (
//         <div className="selected-category">
//           <h4>Selected Category: {categories.find(cat => cat.category_id === selectedCategory)?.category_title}</h4>
//         </div>
//       )} */}
//       {/* Subcategories Section - Renders Below */}
//       {selectedCategories && (
//         <SubcategoriesTree
//           categoryId={selectedCategories} 
//           subcategories={subcategories}
//           subcategoryTypes={subcategoryTypes}
//           getSortParams={getSortParams}
//           selectedCategories={selectedCategories}
//           setSelectedCategories={setSelectedCategories}
//           setSelectedSubCategory={setSelectedSubCategory}
//           selectedSubCategory={selectedSubCategory}
//           selectedSubCategoryTypes={selectedSubCategoryTypes}
//           setSelectedSubCategoryTypes={setSelectedSubCategoryTypes}
//         />
//       )}
//     </div>
//   );
// };

// ShopCategories.propTypes = {
//   categories: PropTypes.array.isRequired,
//   selectedCategories: PropTypes.string,
//   setSelectedCategories: PropTypes.func.isRequired,
//   getSortParams: PropTypes.func.isRequired,
//   subcategories: PropTypes.array.isRequired,
//   subcategoryTypes: PropTypes.array.isRequired
// };

// export default ShopCategories;
import PropTypes from "prop-types";
import React, { useState } from "react";
import SubcategoriesTree from "./ShopSubCategories";

const ShopCategories = ({ 
  categories, subcategories, subcategoryTypes, getSortParams 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoryTypes, setSelectedSubCategoryTypes] = useState([]);

  const handleCategorySelection = (categoryId) => {
    if (selectedCategory === categoryId) {
      // If the same category is clicked, unselect it
      setSelectedCategory(null);
      setSelectedSubCategories([]);
      setSelectedSubCategoryTypes([]);
      getSortParams("category", "");
    } else {
      // Select new category
      setSelectedCategory(categoryId);
      setSelectedSubCategories([]);
      setSelectedSubCategoryTypes([]);
      getSortParams("category", categoryId);
    }
  };

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

