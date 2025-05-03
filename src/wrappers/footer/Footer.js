import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";

const Footer = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${backgroundColorClass || ""} ${spaceTopClass || ""} ${spaceBottomClass || ""} ${extraFooterClass || ""} ${spaceLeftClass || ""} ${spaceRightClass || ""}`}
      style={{ backgroundColor: "#1fb0c1", color: "white" }} // Ampro violet
    >
      <div className={containerClass || "container"}>
        <div className="row" style={{ paddingBottom: "30px" }}>
          {/* Logo in Circle */}
          <div
            className={`${sideMenu ? "col-xl-5 col-sm-7" : "col-lg-4 col-sm-6"}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                width: "220px",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)"
              }}
            >
              <img
                src="/images/Ampro_Logo.png"
                alt="Ampro Logo"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${sideMenu ? "col-xl-4 col-sm-6" : "col-lg-4 col-sm-6"}`}>
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3 style={{ color: "white" }}>QUICK LINKS</h3>
              </div>
              <div className="footer-list">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["/", "/about", "/shop", "/shop", "/contact", "/privacypolicypage", "/refundpolicypage", "/disclaimerpage"].map((path, idx) => {
                    const labels = ["Home", "About Us", "Shop", "Collection", "Contact", "Privacy Policy", "Refund Policy", "Disclaimer"];
                    return (
                      <li key={idx} style={{ marginBottom: "8px" }}>
                        <Link
                          to={process.env.PUBLIC_URL + path}
                          style={{
                            color: "white",
                            textDecoration: "none"
                          }}
                          onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                        >
                          {labels[idx]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className={`${sideMenu ? "col-xl-4 col-sm-8" : "col-lg-4 col-sm-6"}`}>
            <div className={`${sideMenu ? "footer-widget mb-30 ml-145" : "footer-widget mb-30 ml-75"}`}>
              <div className="footer-title">
                <h3 style={{ color: "white" }}>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
                    <li key={platform} style={{ marginBottom: "8px" }}>
                      <a
                        href={`//www.${platform}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "white",
                          textDecoration: "none"
                        }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FooterCopyright at the bottom */}
        <div >
  <FooterCopyright />
</div>
      </div>

      {/* Scroll to top */}
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={scrollToTop}
        style={{
          backgroundColor: "white",
          color: "#673AB7",
          border: "none",
          borderRadius: "50%",
          padding: "10px 15px",
          fontSize: "18px",
          cursor: "pointer",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          display: scroll > top ? "inline-block" : "none"
        }}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

Footer.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default Footer;
