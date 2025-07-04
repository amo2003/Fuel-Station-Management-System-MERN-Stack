// src/pages/Home.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios'; 
import './Home.css';
import HomeNav from '../HomeNav/HomeNav';
import logoImg from '../../assets/f2.png';

function Home() {
  const history = useNavigate();
  const [member, setMember] = useState({
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.staff) {
        alert("Login Success");
        history("/admin");
      } else {
        alert("Login error: Invalid credentials");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/members/login", {
        gmail: member.gmail,
        password: member.password,
      })
      .then((res) => res.data);
  };

  return (
    <>
      <HomeNav />
      <div className="home-page">
        <div className="login-container">
          <div className="logo">
            <img src={logoImg} alt="FuelFlow Logo" />
            <h2>
              <span className="fuel">FUEL</span>
              <span className="flow">FLOW</span> <span className="lite">Admin</span>
            </h2>
            <p className="subtitle">Dasu Filling Station, Galle</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="gmail"
              name="gmail"
              onChange={handleInputChange}
              value={member.gmail}
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={member.password}
              placeholder="Enter your password"
              required
            />

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit">SIGN IN</button>
          </form>

        
          <p className="footer">© 2025 Project Developed by You</p>
        </div>
      </div>
    </>
  );
}

export default Home;
