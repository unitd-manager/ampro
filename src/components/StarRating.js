import React from 'react';
import PropTypes from 'prop-types';
import './StarRating.css';

const StarRating = ({ rating, handleRatingChange }) => {
  const handleClick = (value) => {
    handleRatingChange(value);
  };

  return (
    <div>
      <h2>Star Rating: {rating}</h2>
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;

          return (
            <div className="star-wrapper" key={index}>
              {/* Left Half */}
              <div className="half left" onClick={() => handleClick(starValue - 0.5)} />
              {/* Right Half */}
              <div className="half right" onClick={() => handleClick(starValue)} />
              {/* Full star background */}
              <div
                className={`star ${rating >= starValue ? 'filled' : rating >= starValue - 0.5 ? 'half-filled' : ''}`}
              >
                ★
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
};

export default StarRating;
