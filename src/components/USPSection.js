import React from 'react';
import './USPSection.scss';

const USPSection = () => {
  const usps = [
    { icon: 'fas fa-users', title: '1000+ Happy Customers', description: 'Trusted by thousands of satisfied customers.' },
    { icon: 'fas fa-award', title: '20+ Years in Business', description: 'Decades of experience in delivering quality.' },
    { icon: 'fas fa-leaf', title: 'Certified Organic Products', description: 'Committed to organic and sustainable products.' },
  ];

  return (
    <section className="usp-section">
      <div className="container">
        <h2 className="usp-title">Why Choose Us?</h2>
        <div className="usp-items">
          {usps.map((usp, index) => (
            <div key={index} className="usp-item">
              <i className={usp.icon} aria-hidden="true"></i>
              <h3>{usp.title}</h3>
              <p>{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
