import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddMember.css';
import logo from '../../assets/f2.png';

function AddMember() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    password: "",
    role: "",
    age: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name" || name === "role") {
      value = value.replace(/[^A-Za-z ]/g, "");
    }

    setInputs(prev => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/members", inputs);
      const memberId = res.data.member._id;
      if (!memberId) throw new Error("No member ID returned");
      alert("Member added successfully");
      navigate("/displaymember");
    } catch (err) {
      alert("Error adding member. Please check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="addfuelstaff-page">
      <nav className="addfuelstaff-navbar">
        <Link to="/" className="nav-logo">FuelFlow Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/displaymember">Staff List</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="addfuelstaff-container">
        <div className="form-header">
          <img src={logo} alt="Dasu Filling Station Logo" className="station-logo" />
          <h1 className="addfuelstaff-title">Dasu Filling Station, Galle.</h1>
          <h2 className="addfuelstaff-subtitle">Add Fuel Station Staff</h2>
        </div>

        <form onSubmit={handleSubmit} className="addfuelstaff-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gmail">Email Address:</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role / Job Title:</label>
            <input
              type="text"
              id="role"
              name="role"
              onChange={handleChange}
              value={inputs.role}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={handleChange}
              value={inputs.age}
              required
              min="18"
              max="70"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, ""); 
            setInputs((prev) => ({ ...prev, contact: value,
      }));
    }}
    value={inputs.contact}
    required
    maxLength="15"
    minLength="10"
    title="Contact number must be 10 to 15 digits"
  />
</div>

          <button type="submit" className="submit-btn">Add Staff</button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
