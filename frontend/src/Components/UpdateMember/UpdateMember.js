import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateMember.css';
import logo from '../../assets/f2.png';

function UpdateMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    role: "",
    age: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/members/${id}`);
        setForm(res.data.member);
      } catch (err) {
        console.log("Error fetching member:", err);
      }
    };
    fetchMember();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/members/${id}`, form);
      alert("Member updated successfully!");
      navigate("/displaymember");
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  return (
    <div className="update-member-page">
      <div className="update-member-container">
        <img src={logo} alt="Logo" className="update-member-logo" />
        <h2>Update Member Details</h2>
        <form onSubmit={handleSubmit} className="update-member-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input name="name" id="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="gmail">Email:</label>
            <input name="gmail" id="gmail" type="email" value={form.gmail} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="text" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role / Job Title:</label>
            <input name="role" id="role" value={form.role} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input name="age" id="age" type="number" value={form.age} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input name="address" id="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number:</label>
            <input name="contact" id="contact" type="tel" value={form.contact} onChange={handleChange} required />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMember;
