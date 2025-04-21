import React from "react";
import { Row, Col } from "react-bootstrap";
import "./TopBrands.css";

const brands = ["🛍️", "🍔", "🏆", "📱", "🧴"]; // Dummy Brand Icons

const TopBrands = () => {
  return (
    <div className="top-brands">
      <h2 className="brands-title">Top Brands</h2>
      <Row className="justify-content-center">
        {brands.map((brand, index) => (
          <Col key={index} md={4} lg={2} className="brand-item">
            <div className="brand-logo">{brand}</div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TopBrands;
