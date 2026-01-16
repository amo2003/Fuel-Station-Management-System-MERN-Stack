import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePin.css";
import logo from "../../assets/f2.png"; 

function CreatePin() {
  const [newPin, setNewPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGeneratePin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/chat/generate-pin");
      if (res.data.success) {
        setNewPin(res.data.pin);
      } else {
        setError("Failed to generate PIN. Please try again.");
      }
    } catch (err) {
      console.error("Error generating PIN:", err);
      setError("Server error. Please try again later.");
    }
    setLoading(false);
  };

  const goToChat = () => {
    if (newPin) {
      navigate(`/customerchat/${newPin}`);
    }
  };

  return (
    <div className="create-pin-page">
      <div className="create-pin-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Create Your Chat PIN</h2>

        <button onClick={handleGeneratePin} disabled={loading}>
          {loading ? "Generating..." : "Generate PIN"}
        </button>

        {newPin && (
          <div className="pin-display">
            <p>Your new PIN:</p>
            <h3>{newPin}</h3>
            <button onClick={goToChat}>Go to Chat</button>
          </div>
        )}

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePin;
