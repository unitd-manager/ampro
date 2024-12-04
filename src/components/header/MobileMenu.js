import React, { useEffect, useState } from "react";
import MobileMenuSearch from "./sub-components/MobileSearch";
import MobileNavMenu from "./sub-components/MobileNavMenu";
import MobileLangCurChange from "./sub-components/MobileLangCurrChange";
import MobileWidgets from "./sub-components/MobileWidgets";
import api from "../../constants/api";

const MobileMenu = () => {
  const[categories,setCategories]=useState([]);

  useEffect(() => {
    const offCanvasNav = document.querySelector("#offcanvas-navigation");
    
    // Ensure the element exists before proceeding
    if (!offCanvasNav) return;

    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(".sub-menu");
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    // Add expand button to sub-menus
    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");

    // Expand/collapse sub-menu functionality
    const sideMenuExpand = (e) => {
      e.currentTarget.parentElement.classList.toggle("active");
    };

    // Close the mobile menu on anchor click
    const closeMobileMenu = () => {
      const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
      if (offcanvasMobileMenu) offcanvasMobileMenu.classList.remove("active");
    };

    // Add event listeners
    menuExpand.forEach((expandButton) => {
      expandButton.addEventListener("click", sideMenuExpand);
    });

    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", closeMobileMenu);
    });

    // Cleanup event listeners when component unmounts
    return () => {
      menuExpand.forEach((expandButton) => {
        expandButton.removeEventListener("click", sideMenuExpand);
      });

      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", closeMobileMenu);
      });
    };
  }, []); // Run only once after the initial render

  // Close mobile menu function for the close button
  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    if (offcanvasMobileMenu) offcanvasMobileMenu.classList.remove("active");
  };
  useEffect(()=>{
    
    api.get('/category/getAllCategory').then((res)=>{
      setCategories(res.data.data)
       
           }).catch(err=>{console.log(err)})
  },[])

  return (
    <div className="offcanvas-mobile-menu" id="offcanvas-mobile-menu">
      <button
        className="offcanvas-menu-close"
        id="mobile-menu-close-trigger"
        onClick={() => closeMobileMenu()}
      >
        <i className="pe-7s-close"></i>
      </button>
      <div className="offcanvas-wrapper">
        <div className="offcanvas-inner-content">
          {/* mobile search */}
          <MobileMenuSearch />

          {/* mobile nav menu */}
          <MobileNavMenu 
          categories={categories} 
/>

          {/* mobile language and currency */}
          <MobileLangCurChange />

          {/* mobile widgets */}
          <MobileWidgets />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
