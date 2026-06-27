import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminChat.css";

const API = "https://eac34b48-2a45-4b11-86c9-a129e031408d-prod.e1-us-east-azure.choreoapis.dev/fuel/backend/v1.0";

function AdminChat() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState({});
  const messagesEndRef = useRef(null);

  const fetchPins = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/chat/pins`);
      if (res.data.success) {
        setPins(res.data.data.map((p) => p.pin));
        setNotifications(res.data.data.reduce((acc, p) => {
          acc[p.pin] = p.unread || 0;
          return acc;
        }, {}));
      }
    } catch (err) { console.error(err); }
  }, []);

  const fetchMessages = useCallback(async (pin) => {
    try {
      const res = await axios.get(`${API}/api/chat/pin/${pin}`);
      if (res.data.success) {
        setMessages(res.data.data.map((m) => ({
          sender: m.sender, text: m.message, pin: m.pin, seen: m.seen,
        })));
      }
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    fetchPins();
    const interval = setInterval(fetchPins, 5000);
    return () => clearInterval(interval);
  }, [fetchPins]);

  useEffect(() => {
    if (!selectedPin) return;
    fetchMessages(selectedPin);
    const interval = setInterval(() => fetchMessages(selectedPin), 3000);
    return () => clearInterval(interval);
  }, [selectedPin, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setNotifications(prev => ({ ...prev, [pin]: 0 }));
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedPin) return;
    const text = message.trim();
    setMessage("");

    // Optimistic update
    setMessages(prev => [...prev, { sender: "admin", text, pin: selectedPin, seen: false }]);

    try {
      await axios.post(`${API}/api/chat/send`, {
        sender: "admin",
        message: text,
        pin: selectedPin
      });
    } catch (err) { console.error("Send failed:", err); }
  };

  const deleteChat = async () => {
    if (!selectedPin || !window.confirm(`Delete chat for ${selectedPin}?`)) return;
    try {
      const res = await axios.delete(`${API}/api/chat/delete/${selectedPin}`);
      if (res.data.success) { setMessages([]); alert("Chat deleted"); }
    } catch (err) { alert("Failed to delete"); }
  };

  return (
    <div className="ad-chat-page">
      <nav className="ad-chat-navbar">
        <div className="ad-nav-left">
          <span className="ad-brand">🛠 Dasu Filling Station</span>
        </div>
        <div className="ad-nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/adminchat">Chat</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="ad-chat-wrapper">
        {/* Sidebar */}
        <div className="ad-chat-sidebar">
          <h3>Customers</h3>
          <ul>
            {pins.map((pin) => (
              <li key={pin}
                className={`pin-item ${selectedPin === pin ? "active-pin" : ""}`}
                onClick={() => handlePinClick(pin)}
              >
                <span>{pin}</span>
                {notifications[pin] > 0 && (
                  <span className="pin-notification">{notifications[pin]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat window */}
        <div className="ad-chat-container">
          <h2>{selectedPin ? `Chat: ${selectedPin}` : "Select a customer"}</h2>

          {selectedPin && (
            <div className="chat-buttons">
              <button className="m-delete-btn" onClick={deleteChat}>Delete Chat</button>
            </div>
          )}

          <div className="ad-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={m.sender === "admin" ? "my-msg" : "other-msg"}>
                <b>{m.sender}</b>
                <span>{m.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {selectedPin && (
            <div className="ad-chat-input">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminChat;
