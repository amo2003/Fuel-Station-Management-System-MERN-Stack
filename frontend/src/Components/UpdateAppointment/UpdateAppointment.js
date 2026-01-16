import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/f2.png"; 
import "./UpdateAppointment.css";

const slots = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00",
  "20:00-22:00"
];

function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    vtype: "Car",
    date: "",
    slot: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/appoinment/getbyid/${id}`);
        setForm(res.data);
        fetchBookedSlots(res.data.date, res.data.slot);
      } catch (err) {
        setError("Failed to load appointment");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  // Fetch booked slots for selected date
  const fetchBookedSlots = async (date, currentSlot) => {
    try {
      const res = await axios.get(`http://localhost:5000/appoinment/getone?date=${date}`);
      const slots = res.data
        .filter((item) => item.slot !== currentSlot) 
        .map((item) => item.slot);
      setBookedSlots(slots);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "date") {
      setForm(prev => ({ ...prev, date: value, slot: "" }));
      fetchBookedSlots(value, form.slot);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/appoinment/update/${id}`, form);
      setMessage("Appointment updated successfully");
      setTimeout(() => navigate(`/appoinment/profile/${id}`), 2000);
    } catch (err) {
      setError("Failed to update appointment");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="update-appointment-container">
      <img src={logo} alt="Logo" className="update-logo" />
      <h2>Update Appointment</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={form.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="vtype" value={form.vtype} onChange={handleChange} required>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select
          name="slot"
          value={form.slot}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Slot</option>
          {slots.map((slot) => (
            <option
              key={slot}
              value={slot}
              disabled={bookedSlots.includes(slot)}
            >
              {slot} {bookedSlots.includes(slot) ? " (Booked)" : ""}
            </option>
          ))}
        </select>
        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
}

export default UpdateAppointment;
