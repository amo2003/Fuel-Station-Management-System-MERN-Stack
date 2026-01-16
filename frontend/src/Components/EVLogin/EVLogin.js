import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/f2.png'; 
import './EVLogin.css';

function EVLogin() {
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
      const res = await axios.post('http://localhost:5000/ev/evlog', inputs);
      if (res.data.status === 'ok' && res.data.data) {
        alert('Login successful');
        navigate(`/ev/profile/${res.data.data._id}`);
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed, please try again');
    }
  };

  return (
    <div className="ev-login-page">
      <nav className="ev-login-navbar">
        <Link to="/" className="nav-logo">Dasu Fuel Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/evregister">Register</Link>
        </div>
      </nav>

      <div className="ev-login-container">
        <div className="form-header">
          <img src={logo} alt="EV Logo" className="station-logo" />
          <h1 className="form-title">EV Customer Login</h1>
          <h2 className="form-subtitle">Access Your EV Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="ev-login-form">
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
          <Link to="/evreset">Forgot Password?</Link>
        </div>

        <div className="no-account" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Don't have an account?{' '}
            <Link to="/evregister" style={{ fontWeight: 'bold', color: '#0d3b66' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EVLogin;
