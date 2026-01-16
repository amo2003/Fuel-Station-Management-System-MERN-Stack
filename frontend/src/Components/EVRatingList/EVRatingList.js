import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EVRatingList.css";
import { FaTrash, FaSearch } from "react-icons/fa";
import logo from "../../assets/f2.png";

const EVRatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rating/all");
      setRatings(response.data);
    } catch (error) {
      alert("Failed to fetch ratings");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/rating/delete/${id}`);
      setRatings(ratings.filter((r) => r._id !== id));
      alert("Delete success");
    } catch (error) {
      alert("Failed to delete rating");
    }
  };

  const filteredRatings = ratings.filter((r) =>
    r.date && r.date.startsWith(searchDate)
  );

  return (
    <div className="ev-rating-page">
      <img src={logo} alt="Logo" className="ev-rating-logo" />

      <nav className="ev-rating-navbar">
        <Link to="/" className="nav-link">Dasu Filling Station,Galle</Link>
        <Link to="/admin" className="nav-link">Admin Page</Link>
      </nav>

      <div className="rating-list-container">
        <h2>All Service Ratings</h2>

        <div className="rating-search-bar">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <FaSearch className="rating-search-icon" />
        </div>

        <table className="rating-table">
          <thead>
            <tr>
              <th>Rating (★)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.length === 0 ? (
              <tr>
                <td colSpan="3">No ratings found</td>
              </tr>
            ) : (
              filteredRatings.map((rating) => (
                <tr key={rating._id}>
                  <td>{rating.rating }</td>
                  <td>{new Date(rating.date).toISOString().split("T")[0]}</td>
                  <td>
                    <button
                      className="rating-delete-btn"
                      onClick={() => handleDelete(rating._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EVRatingList;
