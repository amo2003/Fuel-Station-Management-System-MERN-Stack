import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackDisplayPage.css";

function FeedbackDisplayPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterSection, setFilterSection] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedbacks");
      setFeedbacks(res.data.feedbacks || []); // ensure array
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Delete feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:5000/feedbacks/${id}`);
        fetchFeedbacks();
        alert("Feedback delete Success");
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete feedback:", error);
      }
    }
  };

  // Filtered feedbacks based on section and date
  const displayedFeedbacks = feedbacks.filter((fb) => {
    const matchSection = filterSection ? fb.section === filterSection : true;
    const matchDate = searchDate ? fb.date === searchDate : true; 
    return matchSection && matchDate;
  });

  return (
    <div className="feedbacklist-display-page">
      {/* Navbar */}
      <nav className="feedbacklist-display-navbar">
        <a href="/" className="feedbacknav-title">
          Dasu Filling Station, Galle
        </a>
        <div className="nav-links">
          <a href="/admin">Admin</a>
          <a href="/">Logout</a>
        </div>
      </nav>

      {/* Filter Section */}
      <div className="feedbacklist-filters">
        <div>
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="">All Sections</option>
            <option value="EV Section">EV Section</option>
            <option value="Bulk Order Section">Bulk Order Section</option>
          </select>
        </div>

        <div>
          <input 
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          {searchDate && (
            <button className="feed-clear" onClick={() => setSearchDate("")} >Clear</button>
          )}
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="feedbacklist-cards-container">
        {displayedFeedbacks.length === 0 ? (
          <p className="no-feedback-msg">No feedbacks available.</p>
        ) : (
          displayedFeedbacks.map((fb) => (
            <div key={fb._id} className="feedbacklist-card">
              <h3>{fb.name}</h3>
              <p>
                <strong>Email:</strong> {fb.gmail}
              </p>
              <p>
                <strong>Section:</strong> {fb.section}
              </p>
              <p>
                <strong>Contact:</strong> {fb.contact}
              </p>
              <p>
                <strong>Message:</strong> {fb.message}
              </p>
              {fb.date && (
                <p className="feedbacklist-date">📅 {fb.date}</p>
              )}
              <button className="feed-delete-btn" onClick={() => handleDelete(fb._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackDisplayPage;
