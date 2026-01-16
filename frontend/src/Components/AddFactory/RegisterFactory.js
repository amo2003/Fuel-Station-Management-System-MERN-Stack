import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterFactory.css'; 
import logo from '../../assets/f2.png'; 

function FactoryRegister() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    password: "", 
    company: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/factory/register", inputs);
      if (res.data.status === 'ok') {
        alert("Factory registered successfully");
        navigate("/flogin");  
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      alert("Error registering factory. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="factory-register-page">
      <nav className="factory-register-navbar">
        <Link to="/" className="nav-logo">Dasu Filling Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/flogin">Login</Link>
        </div>
      </nav>

      <div className="factory-register-container">
        <div className="form-header">
          <img src={logo} alt="Station Logo" className="station-logo" />
          <h1 className="form-title">Commercial Customer Registration</h1>
          <h2 className="form-subtitle">Register You Below</h2>
        </div>

        <form onSubmit={handleSubmit} className="factory-register-form">
          <div className="form-group">
            <label htmlFor="name">Owner's Name:</label>
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
            <label htmlFor="company">Company Name:</label>
            <input
              type="text"
              id="company"
              name="company"
              onChange={handleChange}
              value={inputs.company}
              required
              autoComplete="off"
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
              type="tel"
              id="contact"
              name="contact"
              onChange={handleChange}
              value={inputs.contact}
              required
              pattern="[0-9]{10,15}"
              title="Contact number must be 10 to 15 digits"
            />
          </div>

          <button type="submit" className="submit-btn">Enter To Register</button>
        </form>
      </div>
    </div>
  );
}

export default FactoryRegister;
