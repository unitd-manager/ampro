import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { getUser } from "../../../../src/common/user";

const MobileNavMenu = ({ strings, categories }) => {
  const [user, setUser] = useState();
console.log(user);
  useEffect(() => {
    const userinfo = getUser();
    setUser(userinfo);
  }, []);

  return (
    <div>
      <nav className="offcanvas-navigation" id="offcanvas-navigation">
        <ul>
          <li className="menu-item-has-children">
            <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
           
          </li>

          <li className="menu-item-has-children">
            <Link to={process.env.PUBLIC_URL + "/about"}>
              <span>About Us</span>
            </Link>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>
              {strings["shop"]}
            </Link>
          </li>

          <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop"}>
          <span>Collection</span></Link>
          <ul className="sub-menu">
              {categories && categories.length > 0 ? (
                  categories.map((el) => (
                    <li key={el.category_id}>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          `/shop?category=${el.category_id}`
                        }
                      >
                        {el.category_title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories available</li>
                )}
              </ul>
        </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default multilanguage(MobileNavMenu);
