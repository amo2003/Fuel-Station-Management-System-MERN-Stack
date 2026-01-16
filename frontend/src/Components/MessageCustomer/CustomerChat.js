import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./CustomerChat.css";
import axios from "axios";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function CustomerChat() {
  const { pin } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/pin/${pin}`);
        if (res.data.success) setMessages(res.data.data.map(m => ({ sender: m.sender, text: m.message, pin: m.pin, seen: m.seen })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [pin]);

  useEffect(() => {
    socket.emit("joinChat", { userType: "customer", pin });

    socket.on("receiveMessage", (data) => {
      if (data.pin === pin) setMessages(prev => [...prev, data]);
    });

    socket.on("messagesSeen", ({ pin: seenPin }) => {
      if (seenPin === pin) {
        setMessages(prev =>
          prev.map(m => m.sender === "customer" ? { ...m, seen: true } : m)
        );
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesSeen");
    };
  }, [pin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", { sender: "customer", text: message, pin });
    setMessage("");
  };

  return (
    <div className="cus-chat-page">
      
      {/* 🔹 Logo + Welcome Note */}
      <div className="cus-chat-header">
        <img src={require("../../assets/f2.png")} alt="Logo" className="cus-chat-logo-img" />
        <h3 className="cus-chat-welcome">👋 Welcome to Dasu Filling Station! We're here to chat with you.</h3>
      </div>

      <div className="cus-chat-container">
        <h2>Customer Chat (PIN: {pin})</h2>
        <div className="cus-chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={m.sender === "customer" ? "my-msg" : "other-msg"}>
              <b>{m.sender}:</b> <span>{m.text}</span>
              {!m.seen && m.sender === "customer" && " 🟢"}
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
