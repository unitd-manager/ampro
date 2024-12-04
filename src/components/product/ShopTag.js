import PropTypes from "prop-types";
import React,{useState} from "react";
import { setActiveSort,setInactiveSort } from "../../helpers/product";

const ShopTag = ({ tags, getSortParams }) => {

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag,e) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
      getSortParams("tag",'');
      setInactiveSort(e);
    } else {
      setSelectedTags([...selectedTags, tag]);
      getSortParams("tag", tag);
      setActiveSort(e);
    }
    console.log('selected tags',selectedTags)
  };
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag </h4>
      <div className="sidebar-widget-tag mt-25">
        {tags ? (
          <ul>
            {tags.map((tag, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={e => {
                      handleTagClick(tag,e);
                  }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array
};

export default ShopTag;
