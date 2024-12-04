import React, { useState } from "react";
import LayoutOne from "../../layouts/Layout";
import { Row, Col, Container } from "reactstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import api from "../../constants/api";
import { getUser } from "../../common/user";
import StarRating from "../../components/StarRating";

function Review() {
  const { addToast } = useToasts();
  const { id } = useParams();
  const user = getUser();
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log("rating", newRating);
  };

  const [addNoteData, setAddNoteData] = useState({
    rating: 0,
    comments: "",
    room_name: "product",
    record_id: id,
  });

  const handleData = (e) => {
    setAddNoteData({ ...addNoteData, [e.target.name]: e.target.value });
  };

  const SubmitNote = (e) => {
    //setAddNoteData(console.log(addNoteData))
    e.preventDefault();
    addNoteData.contact_id = user.contact_id;
    addNoteData.rating = rating;
    api.post("/comment/insertComment", addNoteData).then(() => {
      addToast("Comments Added successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      // setTimeout(() => {
      //   // window.location.reload();
      // }, 400);
    });
  };

  return (
    <LayoutOne headerTop="visible">
      <div className="container">
        <div className="ratting-form-wrapper pl-50" style={{ padding: "20px" }}>
          <h3>Add a Review</h3>
          <div className="ratting-form">
            <form action="#">
              <div className="star-box">
                <span>Your rating:</span>
                <div className="ratting-star">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <StarRating
                rating={rating}
                setRating={setRating}
                handleRatingChange={handleRatingChange}
                handleData={handleData}
              />

              <div className="row">
                <div className="col-md-12">
                  <div className="rating-form-style form-submit">
                    <textarea
                      name="comments"
                      placeholder="Message"
                      value={addNoteData && addNoteData.comments}
                      onChange={handleData}
                    />
                    <input
                      type="submit"
                      defaultValue="Submit"
                      onClick={SubmitNote}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
}

export default Review;
