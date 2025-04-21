import React from "react";
import { Row, Col } from "react-bootstrap";
import "./FeaturesSection.css";

const features = [
  { id: 1, title: "Eat Healthier", text: "Modi tempora incidunt ut labore dolore magnam aliquam", icon: "🍏" },
  { id: 2, title: "Fresh And Clean Products", text: "Modi tempora incidunt ut labore dolore magnam aliquam", icon: "🫙" },
  { id: 3, title: "We Have Brands", text: "Modi tempora incidunt ut labore dolore magnam aliquam", icon: "💰" },
  { id: 4, title: "Modern Process", text: "Modi tempora incidunt ut labore dolore magnam aliquam", icon: "🚜" },
];

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <Row className="justify-content-center">
        {features.map((feature) => (
          <Col key={feature.id} md={6} lg={3} className="feature-item">
            <div className="feature-content">
              <div className="feature-icon">{feature.icon}</div>
              <h5 className="feature-title">{feature.title}</h5>
              <p className="feature-text">{feature.text}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesSection;
