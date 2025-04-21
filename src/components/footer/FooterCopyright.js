import PropTypes from "prop-types";
import React from "react";

const FooterCopyright = ({ spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}
      style={{
        textAlign: "center",
        color: "#fff",
        fontSize: "14px",
        padding: "15px 0"
      }}
    >
      © 2025{" "}
      <a
        href="//hasthemes.com"
        rel="noopener noreferrer"
        target="_blank"
        style={{ color: "#fff", textDecoration: "underline" }}
      >
        Ampro
      </a>{" "}
      – All Rights Reserved
    </div>
  );
};

FooterCopyright.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
