import React from "react";
import PropTypes from "prop-types";
const FooterMap = (props) => {
  const { description } = props;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={description}
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

FooterMap.propTypes = {
  description: PropTypes.string,
};

export default FooterMap;
