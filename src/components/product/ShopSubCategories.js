import PropTypes from "prop-types";
import React from "react";

const SubcategoriesTree = ({ 
  categoryId, subcategories, subcategoryTypes, getSortParams, 
  selectedSubCategories, setSelectedSubCategories,
  selectedSubCategoryTypes, setSelectedSubCategoryTypes
}) => {

  const handleSubcategorySelection = (subcategoryId) => {
    let updatedSubCategories = selectedSubCategories.includes(subcategoryId)
      ? selectedSubCategories.filter(id => id !== subcategoryId) // Remove if already selected
      : [...selectedSubCategories, subcategoryId]; // Add if not selected

    setSelectedSubCategories(updatedSubCategories);
    if(updatedSubCategories.length >0){
    getSortParams("subcategory", subcategoryId,updatedSubCategories);
    }
    if(updatedSubCategories.length=== 0){
      setSelectedSubCategoryTypes([]);
      getSortParams("category", categoryId);
    }
  };


  const handleTypeSelection = (typeId) => {
    let updatedTypes = selectedSubCategoryTypes.includes(typeId)
      ? selectedSubCategoryTypes.filter(id => id !== typeId) // Remove if already selected
      : [...selectedSubCategoryTypes, typeId]; // Add if not selected

    setSelectedSubCategoryTypes(updatedTypes);
    // getSortParams("subcategorytype",typeId ,updatedTypes);

    if(updatedTypes.length >0){
      getSortParams("subcategorytype",typeId ,updatedTypes);
      }
      if(updatedTypes.length=== 0){
        getSortParams("subcategory", typeId,selectedSubCategories);
      }
  };

  return (
    <div>
      <h4 className="pro-sidebar-title">Sub Categories</h4>
      <div className="sidebar-widget-list mt-30">
      <ul style={{ marginLeft: "20px", listStyle: "none" }}>
        {subcategories
          .filter(sub => sub.category_id === categoryId) 
          .map(sub => (
            <li key={sub.sub_category_id}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  name="subcategory"
                  value={sub.sub_category_id}
                  checked={selectedSubCategories.includes(sub.sub_category_id)}
                  onChange={() => handleSubcategorySelection(sub.sub_category_id)}
                />
                <span className="checkmark"></span> {sub.sub_category_title}
              </label>

              {selectedSubCategories.includes(sub.sub_category_id) && (
                <ul style={{ marginLeft: "20px", listStyle: "none" }}>
                  {subcategoryTypes
                    .filter(type => type.sub_category_id === sub.sub_category_id)
                    .map(type => (
                      <li key={type.sub_category_type_id}>
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            name="subcategoryType"
                            value={type.sub_category_type_id}
                            checked={selectedSubCategoryTypes.includes(type.sub_category_type_id)}
                            onChange={() => handleTypeSelection(type.sub_category_type_id)}
                          />
                          <span className="checkmark"></span> {type.type_title}
                        </label>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
      </div>
    </div>
  );
};

SubcategoriesTree.propTypes = {
  categoryId: PropTypes.string.isRequired,
  subcategories: PropTypes.array.isRequired,
  subcategoryTypes: PropTypes.array.isRequired,
  getSortParams: PropTypes.func.isRequired,
  selectedSubCategories: PropTypes.array.isRequired,
  setSelectedSubCategories: PropTypes.func.isRequired,
  selectedSubCategoryTypes: PropTypes.array.isRequired,
  setSelectedSubCategoryTypes: PropTypes.func.isRequired,
};

export default SubcategoriesTree;
