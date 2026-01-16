import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './MemberLogin.css';
import logo from '../../assets/f2.png';  
import bgImage from '../../assets/f1.jpg'; 

function MemberLogin() {
  const navigate = useNavigate();
  const [member, setMember] = useState({ gmail: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/members/login', member);
      const staff = res.data.staff;

      if (staff) {
        alert(`Login successful as ${staff.role}`);
        navigate(`/displaysinglemember/${staff._id}`);
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login error');
      console.error(err);
    }
  };

  return (
    <div 
      className="member-login-page" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="member-login-box">
        <img src={logo} alt="Logo" className="member-logo" />
        <h2>Staff Login</h2>

        <form onSubmit={handleSubmit} className="member-login-form">
          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={member.gmail}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={member.password}
            onChange={handleChange}
            required
          />

          {error && <p className="member-error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Forgot Password: <Link to="/member-forgot">Click to Reset</Link>
        </p>
      </div>
    </div>
  );
}

export default MemberLogin;
