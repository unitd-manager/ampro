import React from 'react';
import PropTypes from 'prop-types';

const RatingComment = ({ rating }) => {
  const totalStars = 5; // Change this value to set the total number of stars

  // Get the percentage of the rating
  const starPercentage = (rating / totalStars) * 100;

  // Round to the nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div className="star-rating">
      <div className="star-rating-inner" style={{ width: starPercentageRounded }}></div>
    </div>
  );
};
RatingComment.propTypes={
    rating:PropTypes.number
}
export default RatingComment;