import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBolt
} from "react-icons/fa";
import './AppointmentBooking.css';

const slots = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00",
  "20:00-22:00"
];

function AppointmentBooking() {
  const [form, setForm] = useState({
    date: "",
    slot: "",
    name: "",
    gmail: "",
    password: "",
    vtype: "Car"
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setForm({ ...form, date: selectedDate, slot: "" });

    try {
      const res = await axios.get(`http://localhost:5000/appoinment/getone?date=${selectedDate}`);
      const booked = res.data.map((item) => item.slot);
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/appoinment/appoinment", form);
      const id = response.data.newBooking._id;
      alert("Booking Success");
      navigate(`/appoinment/profile/${id}`);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("This time slot is already booked. Choose another one.");
      } else {
        setMessage("Failed to book appointment. Try again.");
      }
    }
  };

  return (
    <div className="appointment-page-unique">
      <nav className="appointment-navbar">
        <div className="appointment-nav-container">
          <div className="appointment-nav-logo">
            <FaBolt className="appointment-bolt-icon" />
            <span>Dasu Filling Station, EV Charge Unit</span>
          </div>
          <div className="appointment-nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/locations">Locations</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </nav>

      <div className="appointment-container-unique">
        <div className="appointment-form-wrapper">
          <div className="appointment-form-header">
            <FaBolt className="appointment-header-icon" />
            <h2>Book EV Charging Appointment</h2>
            <p>Power up your vehicle with our fast charging stations</p>
          </div>

          <form onSubmit={handleSubmit} className="appointment-booking-form">
            <div className="appointment-input-group">
              <FaUser className="appointment-input-icon" />
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="appointment-input-group">
              <FaEnvelope className="appointment-input-icon" />
              <input type="email" name="gmail" placeholder="Email" value={form.gmail} onChange={handleChange} required />
            </div>

            <div className="appointment-input-group">
              <FaLock className="appointment-input-icon" />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            </div>

            <div className="appointment-input-group">
              <FaCar className="appointment-input-icon" />
              <select name="vtype" value={form.vtype} onChange={handleChange} required>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="appointment-input-group">
              <FaCalendarAlt className="appointment-input-icon" />
              <input type="date" name="date" value={form.date} onChange={handleDateChange} required />
            </div>

            <div className="appointment-input-group">
              <FaClock className="appointment-input-icon" />
              <select name="slot" value={form.slot} onChange={handleChange} required>
                <option value="">Select Time Slot</option>
                {slots.map((slot) => (
                  <option key={slot} value={slot} disabled={bookedSlots.includes(slot)}>
                    {slot} {bookedSlots.includes(slot) ? " (Booked)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="appointment-submit-btn">
              <FaBolt className="appointment-btn-icon" />
              Book Appointment
            </button>
          </form>

          {message && (
            <p className={`appointment-message ${message.includes("booked") ? "appointment-error" : "appointment-success"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentBooking;
