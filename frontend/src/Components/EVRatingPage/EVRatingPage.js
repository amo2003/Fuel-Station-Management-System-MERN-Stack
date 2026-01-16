import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./EVRatingPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/f2.png"; 

const EVRatingPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/rating/add", { rating });
      alert(`Thank you for rating us ${rating} stars!`);
      navigate("/");
    } catch (error) {
      alert("Failed to submit rating. Please try again.");
    }
  };

  

  return (
    <div className="ev-rating-background">
      <div className="ev-rating-container">
        <img src={logo} alt="Logo" className="ev-rating-logo" />
        <h2>Rate Our EV Charging Service</h2>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={40}
                className="star"
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>
        <button className="submit-rating-btn" onClick={handleSubmit} disabled={rating === 0}>
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default EVRatingPage;
