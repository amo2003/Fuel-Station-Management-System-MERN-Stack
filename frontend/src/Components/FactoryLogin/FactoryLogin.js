import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './FactoryLogin.css';  
import logo from '../../assets/f2.png'; 

function FactoryLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    gmail: '',
    password: '',
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
      const res = await axios.post('http://localhost:5000/factory/falog', inputs);
      if (res.data.status === 'ok' && res.data.data) {
        alert('Login successful');

        navigate(`/factory/profile/${res.data.data._id}`);
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      alert('Login failed, please check console');
      console.error(err);
    }
  };

  return (
    <div className="factory-login-page">
      <nav className="factory-login-navbar">
        <Link to="/contact" className="nav-logo">Dasu Fuel Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/fregister">Register</Link>
        </div>
      </nav>

      <div className="factory-login-container">
        <div className="form-header">
          <img src={logo} alt="Station Logo" className="station-logo" />
          <h1 className="form-title">Commercial Customer Login</h1>
          <h2 className="form-subtitle">Access Your Customer Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="factory-login-form">
          <div className="form-group">
            <label htmlFor="gmail">Email Address:</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
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
              value={inputs.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Login</button>
        </form>

        <div className="forgot-password" style={{ marginTop: '1rem' }}>
          <Link to="/fogotpassword">Forgot Password?</Link>
        </div>

        <div className="no-account" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Don't have an account?{' '}
            <Link to="/fRegister" style={{ fontWeight: 'bold', color: '#0d3b66' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FactoryLogin;
