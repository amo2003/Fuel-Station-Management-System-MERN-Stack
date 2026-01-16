import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BulkPaymentInsert.css";
import logo from "../../assets/f2.png";

function BulkPaymentInsert() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [fuelType] = useState(location.state?.fuelType || "");
  const [quantity] = useState(location.state?.quantity || 0);
  const [pricePerLiter, setPricePerLiter] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fixedPrices = {
      "Petrol 92": 305,
      "Petrol 95": 341,
      "Auto Diesel": 289,
      "Diesel": 325,
      "Kerosene": 185,
    };
    if (fuelType && quantity) {
      const price = fixedPrices[fuelType] || 0;
      setPricePerLiter(price);
      setTotal(quantity * price);
    }
  }, [fuelType, quantity]);

  const handleCardSubmit = async (e) => {
    e.preventDefault();

    // Card number validation
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber)) {
      return alert("Card number must be exactly 16 digits, numbers only.");
    }

    // Expiry validation (MM/YY format, not past)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      return alert("Expiry date must be in MM/YY format and valid.");
    }

    // Check if expiry is in the past
    const [monthStr, yearStr] = expiryDate.split("/");
    const inputMonth = parseInt(monthStr, 10);
    const inputYear = parseInt("20" + yearStr, 10); // convert YY -> YYYY

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 0-based
    const currentYear = now.getFullYear();

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      return alert("Expiry date cannot be in the past.");
    }

    // CVV validation
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      return alert("CVV must be exactly 3 digits.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/payments", {
        orderId,
        fuelType,
        quantity,
        pricePerLiter,
        totalAmount: total,
        paymentMethod: "card",
        cardNumber,
        expiryDate,
        cvv,
      });
      if (res.data.status === "ok") {
        alert("Card Payment Successful!");
        navigate("/mainhome");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  const handleSlipPayment = () => {
    navigate(`/bulkpaymentslip/${orderId}`, {
      state: { fuelType, quantity, pricePerLiter, total },
    });
  };

  return (
    <div className="bulk-payment-container">
      <div className="bulk-payment-overlay">
        <img src={logo} alt="Logo" className="bulk-payment-logo" />
        <div className="bulk-payment-card">
          <h2>💳 Payment for Bulk Order</h2>
          <p><strong>Fuel Type:</strong> {fuelType}</p>
          <p><strong>Quantity:</strong> {quantity} L</p>
          <p><strong>Total:</strong> Rs {total}</p>

          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card Payment
            </label>
            <label>
              <input
                type="radio"
                value="slip"
                checked={paymentMethod === "slip"}
                onChange={() => setPaymentMethod("slip")}
              />
              Bank Deposit / Slip Upload
            </label>
          </div>

          {paymentMethod === "card" ? (
            <form onSubmit={handleCardSubmit} className="payment-form">
              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/g, ""))
                }
                maxLength={16}
                placeholder="Enter 16-digit card number"
                required
              />

              <label>Expiry Date (MM/YY):</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 2) {
                    val = val.slice(0, 2) + "/" + val.slice(2, 4);
                  }
                  setExpiryDate(val);
                }}
                placeholder="MM/YY"
                maxLength={5}
                required
              />

              <label>CVV:</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={3}
                placeholder="3-digit CVV"
                required
              />

              <button type="submit">Pay Now</button>
            </form>
          ) : (
            <button onClick={handleSlipPayment} className="slip-btn">
              Go to Slip Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BulkPaymentInsert;
