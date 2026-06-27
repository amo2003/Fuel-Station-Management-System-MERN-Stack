import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./CustomerChat.css";
import axios from "axios";

const API = "https://eac34b48-2a45-4b11-86c9-a129e031408d-prod.e1-us-east-azure.choreoapis.dev/fuel/backend/v1.0";

function CustomerChat() {
  const { pin } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/chat/pin/${pin}`);
      if (res.data.success) {
        setMessages(res.data.data.map(m => ({
          sender: m.sender,
          text: m.message,
          pin: m.pin,
          seen: m.seen
        })));
      }
    } catch (err) {
      console.error(err);
    }
  }, [pin]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const text = message.trim();
    setMessage("");

    // Optimistic update
    setMessages(prev => [...prev, { sender: "customer", text, pin, seen: false }]);

    try {
      await axios.post(`${API}/api/chat/send`, {
        sender: "customer",
        message: text,
        pin
      });
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div className="cus-chat-page">
      <div className="cus-chat-header">
        <img src={require("../../assets/f2.png")} alt="Logo" className="cus-chat-logo-img" />
        <h3 className="cus-chat-welcome">👋 Welcome to Dasu Filling Station!</h3>
      </div>

      <div className="cus-chat-container">
        <h2>Chat (PIN: {pin})</h2>
        <div className="cus-chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={m.sender === "customer" ? "my-msg" : "other-msg"}>
              <b>{m.sender}</b>
              <span>{m.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="cus-chat-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default CustomerChat;
