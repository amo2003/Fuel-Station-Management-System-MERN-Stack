import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminChat.css";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function AdminChat() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState({});
  const messagesEndRef = useRef(null);

  // ✅ Fetch pins + unread counts
  const fetchPins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chat/pins");
      if (res.data.success) {
        setPins(res.data.data.map((p) => p.pin));
        setNotifications(
          res.data.data.reduce((acc, p) => {
            acc[p.pin] = p.unread || 0;
            return acc;
          }, {})
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch messages for selected pin
  const fetchMessages = async (pin) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/pin/${pin}`);
      if (res.data.success) {
        setMessages(
          res.data.data.map((m) => ({
            sender: m.sender,
            text: m.message,
            pin: m.pin,
            seen: m.seen,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Socket setup
  useEffect(() => {
    socket.emit("joinChat", { userType: "admin" });
    fetchPins();

    socket.on("receiveMessage", (data) => {
      if (!data.pin) return;

      // Increase notification count if not current chat
      setNotifications((prev) => ({
        ...prev,
        [data.pin]:
          data.pin !== selectedPin ? (prev[data.pin] || 0) + 1 : 0,
      }));

      if (data.pin === selectedPin) {
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on("messagesSeen", ({ pin }) => {
      if (pin === selectedPin) {
        setMessages((prev) =>
          prev.map((m) =>
            m.sender === "customer" ? { ...m, seen: true } : m
          )
        );
        setNotifications((prev) => ({ ...prev, [pin]: 0 }));
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesSeen");
    };
  }, [selectedPin]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Select a chat
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    fetchMessages(pin);
    setNotifications((prev) => ({ ...prev, [pin]: 0 }));
  };

  // ✅ Send message
  const sendMessage = () => {
    if (!message.trim() || !selectedPin) return;

    socket.emit("sendMessage", {
      sender: "admin",
      text: message,
      pin: selectedPin,
    });

    setMessage("");
  };

  // ✅ Mark seen
  const markSeen = () => {
    if (!selectedPin) return;
    socket.emit("markSeen", { pin: selectedPin });
  };

  // ✅ Delete chat
  const deleteChat = async () => {
    if (!selectedPin) return;
    if (!window.confirm(`Delete all messages for ${selectedPin}?`)) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/chat/delete/${selectedPin}`
      );
      if (res.data.success) {
        setMessages([]);
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete chat messages.");
    }
  };

  return (
    <div className="ad-chat-page">
      {/* Navbar */}
      <nav className="ad-chat-navbar">
        <div className="ad-nav-left">
          <span className="ad-brand">🛠 Dasu Filling Station, Galle.</span>
        </div>
        <div className="ad-nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/adminchat">Live Chat</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="ad-chat-wrapper">
        {/* Sidebar */}
        <div className="ad-chat-sidebar">
          <h3>Customers</h3>
          <ul>
            {pins.map((pin) => (
              <li 
                key={pin}
                className={`pin-item ${
                  selectedPin === pin ? "active-pin" : ""
                }`}
                onClick={() => handlePinClick(pin)}
              >
                <span>{pin}</span>
                {/* Notification badge */}
                {notifications[pin] > 0 && (
                  <span className="pin-notification">
                    🟢 {notifications[pin]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat window */}
        <div className="ad-chat-container">
          <h2>
            {selectedPin ? `Chat with ${selectedPin}` : "Select a customer"}
          </h2>
          {selectedPin && (
            <div className="chat-buttons">
              <button className="m-mark-btn" onClick={markSeen}>
                Mark Seen
              </button>
              <button className="m-delete-btn" onClick={deleteChat}>
                Delete Chat
              </button>
            </div>
          )}

          <div className="ad-chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.sender === "admin" ? "my-msg" : "other-msg"}
              >
                <b>{m.sender}:</b> <span>{m.text}</span>
                {!m.seen && m.sender === "customer" && " 🟢"}
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
