import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './EVRegister.css';
import logo from '../../assets/f2.png'; 

function EVRegister() {
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    password: '',
    vtype: 'Car',
    address: '',
    contact: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/ev/evregister', formData);
      alert(res.data.message);
      navigate('/evlog');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed');
    }
  };

  return (
    <div className="ev-register-page">
      {/* Page-specific Navbar */}
      <nav className="ev-navbar">
        <div className="ev-navbar-logo">
          <img src={logo} alt="Logo" />
          <span>Dasu Filling Station, Galle.</span>
        </div>
        <div className="ev-navbar-links">
          <Link to="/">Home</Link>
          <Link to="/evlog">Login</Link>
        </div>
      </nav>

      <div className="ev-register-container">
        <div className="ev-form-header">
          <img src={logo} alt="EV Logo" className="ev-logo" />
          <h2 className="ev-form-title">Register Your EV.</h2>
        </div>
        <form className="ev-register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Vehicle Type</label>
            <select
              name="vtype"
              value={formData.vtype}
              onChange={handleChange}
              required
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="ev-submit-btn">Register</button>

        </form>
      </div>
    </div>
  );
}

export default EVRegister;
