import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/f2.png";
import "./FeedbackInsertPage.css";

function FeedbackInsertPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    section: "",
    contact: "",
    message: "",
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/feedbacks", formData);
      setStatus("Feedback submitted successfully!");
      setFormData({
        name: "",
        gmail: "",
        section: "",
        contact: "",
        message: "",
        date: new Date().toISOString().split("T")[0],
      });

       setTimeout(() => {
        navigate("/");
      }, 1000);


    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("Failed to submit feedback.");
    }
  };

  return (
    <div className="feedback-page">
      <nav className="feedback-navbar">
        <a href="/" className="nav-title">Dasu Filling Station, Galle</a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/feedback">Feedback</a>
          <a href="/">Logout</a>
        </div>
      </nav>

      <div className="feedback-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Feedback Form Card */}
      <div className="feedback-card">
        <h2>
          <FontAwesomeIcon icon={faCommentDots} className="text-blue-500" />
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="gmail"
            placeholder="Email Address"
            value={formData.gmail}
            onChange={handleChange}
            required
          />

          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          >
            <option value="">Select Section</option>
            <option value="EV Section">EV Section</option>
            <option value="Bulk Order Section">Bulk Order Section</option>
          </select>

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />  

          <button type="submit">Submit Feedback</button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
}

export default FeedbackInsertPage;
