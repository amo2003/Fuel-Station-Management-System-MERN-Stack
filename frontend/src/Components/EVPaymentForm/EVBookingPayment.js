import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./EVBookingPayment.css";
import logo from "../../assets/f2.png";
import visa from "../../assets/visa.webp";
import master from "../../assets/master.png";
import amex from "../../assets/ame.png";
import { FaStar } from "react-icons/fa";

const API_BASE = "http://localhost:5000/evcombined/book";
const PAYHERE_HASH_API = "http://localhost:5000/getPayhereHash";
const EV_PAYMENT_API = "http://localhost:5000/evpayment";

const slots = [
  "08:00-10:00", "10:00-12:00", "12:00-14:00",
  "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00",
];

function EVBookingPayment() {
  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    vtype: "Car",
    date: "",
    slot: "",
    card: "",
    expdate: "",
    cvv: "",
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [payhereLoaded, setPayhereLoaded] = useState(false);

  const navigate = useNavigate();
  const priceMap = { Car: 1000, Bike: 500, Other: 700 };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => setPayhereLoaded(true);
    document.body.appendChild(script);
  }, []);

  // 🔹 General form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setForm({ ...form, [name]: lettersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Card, Expiry & CVV validation handler
  const handleCardInput = (e) => {
    const { name, value } = e.target;

    if (name === "card") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      setForm({ ...form, card: digits });
    }

    if (name === "expdate") {
      let digits = value.replace(/\D/g, "").slice(0, 4);
      if (digits.length >= 3) {
        digits = digits.slice(0, 2) + "/" + digits.slice(2);
      }
      setForm({ ...form, expdate: digits });
    }

    if (name === "cvv") {
      const digits = value.replace(/\D/g, "").slice(0, 3);
      setForm({ ...form, cvv: digits });
    }
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setForm({ ...form, date: selectedDate, slot: "" });
    try {
      const res = await axios.get(
        `http://localhost:5000/appoinment/getone?date=${selectedDate}`
      );
      const booked = res.data.map((item) => item.slot);
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  // 🔹 Expiry date validation: must be valid MM/YY and not in the past
  const validateExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split("/").map(Number);

    if (mm < 1 || mm > 12) return false; // invalid month

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    // Limit expiry to a realistic future year (e.g., max 10 years ahead)
    if (yy > currentYear + 10) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!/^\d{16}$/.test(form.card)) {
      setMessage("Card number must be exactly 16 digits.");
      return;
    }
    if (!validateExpiry(form.expdate)) {
      setMessage(
        "Expiry date must be valid MM/YY and not in the past (e.g., 08/25)."
      );
      return;
    }
    if (!/^\d{3}$/.test(form.cvv)) {
      setMessage("CVV must be exactly 3 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(API_BASE, form);
      if (res.data.status === "ok") {
        setBookingId(res.data.booking._id);
        alert("Booking & Payment Successful!");
        setShowPopup(true);
      }
    } catch (err) {
      if (err.response?.status === 409)
        setMessage("This slot is already booked.");
      else setMessage("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayHerePayment = async () => {
    if (!payhereLoaded) {
      alert("PayHere SDK not loaded yet.");
      return;
    }
    if (!form.date || !form.slot) {
      alert("Please select a date and slot.");
      return;
    }

    const amount = priceMap[form.vtype];
    const orderId = `EV-${Date.now()}`;

    try {
      const hashRes = await axios.post(PAYHERE_HASH_API, {
        order_id: orderId,
        amount,
        currency: "LKR",
      });

      const payment = {
        sandbox: true,
        merchant_id: "1231683",
        return_url: window.location.href,
        cancel_url: window.location.href,
        notify_url: "http://localhost:5000/evpayment/notify",
        order_id: orderId,
        items: `${form.vtype} EV Charging`,
        amount,
        currency: "LKR",
        hash: hashRes.data.hash,
        first_name: form.name,
        last_name: "",
        email: form.gmail,
        phone: "0771234567",
        address: "Galle",
        city: "Galle",
        country: "Sri Lanka",
      };

      window.payhere.onCompleted = async function (orderId) {
        alert("Payment completed. Order ID: " + orderId);

        try {
          const bookingRes = await axios.post(API_BASE, {
            name: form.name,
            gmail: form.gmail,
            password: form.password,
            vtype: form.vtype,
            date: form.date,
            slot: form.slot,
            paymentStatus: "Paid",
            orderId,
            amount,
          });

          const newBookingId = bookingRes.data.booking._id;
          setBookingId(newBookingId);

          await axios.post(EV_PAYMENT_API, {
            name: form.name,
            card: form.card,
            vType: form.vtype,
            amount,
            expdate: form.expdate,
            cvv: parseInt(form.cvv),
            orderId,
          });

          setShowPopup(true);
        } catch (err) {
          console.error(
            "Booking creation failed after PayHere:",
            err.response?.data || err.message
          );
          alert(
            "Booking failed after payment. Please contact support with Order ID: " +
              orderId
          );
        }
      };

      window.payhere.onDismissed = function () {
        alert("Payment popup closed.");
      };
      window.payhere.onError = function (error) {
        alert("Payment error: " + error);
      };

      window.payhere.startPayment(payment);
    } catch (err) {
      console.error("Error starting PayHere payment:", err);
      alert("Failed to start PayHere payment.");
    }
  }; 

  const handleRateNow = () => navigate("/ev-rating");
  const handleLater = () => navigate(`/appoinment/profile/${bookingId}`);
 
  return (
    <div className="ev-bg">
      <nav className="ev-navbar">
        <div>
          <span>Dasu Filling Station, Galle. EV Charging </span>
        </div>
        <div className="paymentbooking-navbar-links">
          <Link to="/">Home</Link>
          <Link to="/evlog">Login</Link>
        </div>
      </nav>

      <div className="ev-booking-wrapper">
        <img src={logo} alt="Logo" className="ev-logo" />
        <div className="ev-booking-payment-container">
          <h2>EV Charging Booking</h2>
          <form className="ev-booking-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="gmail"
              type="email"
              placeholder="Email"
              value={form.gmail}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              name="vtype"
              value={form.vtype}
              onChange={handleChange}
              required
            >
              <option value="Car">Car - Rs. 1000</option>
              <option value="Bike">Bike - Rs. 500</option>
              <option value="Other">Other - Rs. 700</option>
            </select>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />

            <select
              name="slot"
              value={form.slot}
              onChange={handleChange}
              required
            >
              <option value="">Select Slot</option>
              {slots.map((s) => (
                <option key={s} value={s} disabled={bookedSlots.includes(s)}>
                  {s} {bookedSlots.includes(s) ? " (Booked)" : " ✅ Available"}
                </option>
              ))}
            </select>

            {form.slot && (
              <>
                <div className="card-images">
                  <img src={visa} alt="Visa" />
                  <img src={master} alt="MasterCard" />
                  <img src={amex} alt="Amex" />
                </div>

                <h3>Payment Details</h3>
                <input
                  name="card"
                  placeholder="Card Number"
                  value={form.card}
                  onChange={handleCardInput}
                  maxLength={16}
                  required
                />
                <input
                  name="expdate"
                  placeholder="MM/YY"
                  value={form.expdate}
                  onChange={handleCardInput}
                  maxLength={5}
                  required
                />
                <input
                  name="cvv"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={handleCardInput}
                  maxLength={3}
                  required
                />
              </>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : `Confirm Booking & Pay Rs. ${priceMap[form.vtype]}`}
            </button>

            <button
              type="button"
              onClick={handlePayHerePayment}
              disabled={loading}
              style={{
                marginTop: "10px",
                backgroundColor: "#0d6efd",
                color: "#fff",
              }}
            >
              Pay with PayHere Rs. {priceMap[form.vtype]}
            </button>
          </form>

          {message && <p className="message error">{message}</p>}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>🎉 Booking Completed!</h3>
            <p>Would you like to rate your experience?</p>
            <div className="popup-buttons">
              <button onClick={handleRateNow} className="popup-rate-btn">
                <FaStar /> Give Rating
              </button>
              <button onClick={handleLater} className="popup-later-btn">
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EVBookingPayment;
