import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({rating,setRating,handleRatingChange}) => {
  

  return (
    <div>
      <h2>Star Rating: {rating}</h2>
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className={starValue <= rating ? 'star active' : 'star'}
              onClick={() => {handleRatingChange(starValue);}}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};
StarRating.propTypes={
  rating:PropTypes.number,
  setRating:PropTypes.func,
  handleRatingChange:PropTypes.func
  
}

export default StarRating;