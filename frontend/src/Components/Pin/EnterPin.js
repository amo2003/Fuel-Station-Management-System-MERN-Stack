import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EnterPin.css";
import logo from "../../assets/f2.png"; 

function EnterPin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!pin.trim()) {
      setError("Please enter your PIN.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/chat/check-pin/${pin}`);
      if (res.data.success) {
        navigate(`/customerchat/${pin}`);
      } else {
        setError("Invalid PIN. Please create a new one.");
      }
    } catch (err) {
      console.error(err);
      setError("PIN not found. Please create a new one.");
    }
  };

  const handleCreatePin = () => {
    navigate("/createpin");
  };

  return (
    <div className="enter-pin-page">
      <form onSubmit={handleSubmit} className="enter-pin-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Enter Your Chat PIN</h2>
        <input
          type="text"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
        />
        <button type="submit">Enter Chat</button>
        {error && <p className="error-msg">{error}</p>}
        <p>Don't have a PIN?</p>
        <button
          type="button"
          onClick={handleCreatePin}
          className="create-pin-btn"
        >
          Create New PIN
        </button>
      </form>
    </div>
  );
}

export default EnterPin;
