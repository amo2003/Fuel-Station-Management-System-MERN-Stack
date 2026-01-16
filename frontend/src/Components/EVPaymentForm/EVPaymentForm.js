import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./EVPaymentForm.css";
import logo from "../../assets/f2.png"; 
import visa from "../../assets/visa.webp"; 
import master from "../../assets/master.png"; 
import amex from "../../assets/ame.png"; 

const API_BASE = "http://localhost:5000/evpayment";

function EVPaymentForm() {
  const [form, setForm] = useState({
    name: "",
    card: "",
    vType: "",
    amount: "",
    expdate: "",
    cvv: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const priceMap = {
    Car: 1000,
    Bike: 500,
    Other: 700,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vType") {
      const selectedAmount = priceMap[value] || "";
      setForm((prev) => ({
        ...prev,
        vType: value,
        amount: selectedAmount,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, card, vType, amount, expdate, cvv } = form;

    if (!name || !card || !vType || !amount || !expdate || !cvv) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(API_BASE, {
        name,
        card,
        vType,
        amount: Number(amount),
        expdate,
        cvv: Number(cvv),
      });

      if (res.data.status === "ok") {
        setMessage("Payment added successfully!");
        setForm({
          name: "",
          card: "",
          vType: "",
          amount: "",
          expdate: "",
          cvv: "",
        });
        alert("Success Payment");
        navigate("/payment-success");
      } else {
        setMessage("Failed to add payment");
      }
    } catch (error) {
      setMessage("Error adding payment");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="ev-payment-container">
      <nav className="ev-payment-navbar">
        <div className="payment-navbar-name">
        <h1>Dasu Fuel Station, Galle.</h1>
        </div>
        <div className="payment-navbar-links">
          <Link to="/">Home</Link>
          <Link to="/evlog">Login</Link>
        </div>
      </nav>

      <div className="ev-payment-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="ev-payment-form-box">
        <div className="card-icons">
          <img src={visa} alt="Visa" />
          <img src={master} alt="MasterCard" />
          <img src={amex} alt="AmEx" />
        </div>

        <h2>EV Payment</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            type="text"
            name="card"
            value={form.card}
            onChange={handleChange}
            placeholder="Card Number"
            maxLength={16}
          />

          <select name="vType" value={form.vType} onChange={handleChange}>
            <option value="">-- Select Vehicle Type --</option>
            <option value="Car">Car - Rs. 1000</option>
            <option value="Bike">Bike - Rs. 500</option>
            <option value="Other">Other - Rs. 700</option>
          </select>

          <input
            type="number"
            name="amount"
            value={form.amount}
            readOnly
            placeholder="Amount"
          />

          <input
            type="text"
            name="expdate"
            value={form.expdate}
            onChange={handleChange}
            placeholder="Expiry Date (MM/YY)"
            maxLength={5}
          />

          <input
            type="password"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength={3}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Payment"}
          </button>
        </form>

        {message && (
          <div className={`message ${message.toLowerCase().includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default EVPaymentForm;
