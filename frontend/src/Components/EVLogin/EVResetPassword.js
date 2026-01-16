// src/pages/EV/EVForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/f2.png";
import './EVResetPassword.css';

function EVForgotPassword() {
  const navigate = useNavigate();
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/ev/reset-password", {
        gmail,
        password,
      });

      if (res.data.status === "ok") {
        alert("Password reset successfully!");
        navigate("/evlog");
      } else {
        alert(res.data.message || "Password reset failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while resetting password.");
    }
  };

  return (
    <div className="ev-forgot-password-page">

      <div className="ev-forgot-password-container">
        <div className="form-header">
          <img src={logo} alt="Station Logo" className="station-logo" />
          <h1 className="form-title">Reset EV Password</h1>
          <h2 className="form-subtitle">Enter your EV email and new password</h2>
        </div>

        <form onSubmit={handleSubmit} className="ev-forgot-password-form">
          <div className="form-group">
            <label htmlFor="gmail">Email Address:</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value.trimStart())}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
              placeholder="At least 4 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>

          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default EVForgotPassword;
