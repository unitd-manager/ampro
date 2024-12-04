import React from 'react'
import Rating from "./sub-components/ProductRating";
import RatingComment from './RatingComment';

function ProductReviewTab({comments}) {
  return (
    <div>
         <div className="row">
            {comments && comments.map((comment)=>{
                return(
                <div className="col-lg-7">
                    <div className="review-wrapper">
                      <div className="single-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>{comment&& comment.first_name}</h4>
                              </div>
                              <div className="product-details-content ml-70">
                              {comment&& comment.rating >0? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={comment&& comment.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      </div>
           
                            </div>                          
                          </div>
                          <div className="review-bottom">
                            <p>
                             {comment&& comment.comments}
                            </p>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>)
            })}
                  </div>
    </div>
  )
}

export default ProductReviewTab