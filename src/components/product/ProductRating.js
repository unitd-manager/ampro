import React from 'react';
import PropTypes from 'prop-types'

const ProductRating = ({ rating }) => {
  const renderStars = () => {
    const roundedRating = Math.round(rating * 2) / 2; // Round the rating to the nearest half value
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (roundedRating >= i + 0.5) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else if (roundedRating >= i) {
        stars.push(<span key={i}>&#9734;</span>); // Half-filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};
ProductRating.propTypes={
    rating:PropTypes.number
}

export default ProductRating;