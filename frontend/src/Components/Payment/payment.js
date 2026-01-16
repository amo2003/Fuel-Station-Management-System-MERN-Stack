import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import logo from '../../assets/f2.png';

function PaymentPage() {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [loading, setLoading] = useState(true);
  const [payhereLoaded, setPayhereLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => setPayhereLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/stocks/${id}`);
        setStock(res.data.stock);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stock:', err);
        setLoading(false);
      }
    };
    fetchStock();
  }, [id]);

  // Manual payment
  const handleConfirmPayment = async () => {
    if (!stock || !pricePerLiter) {
      alert("Please enter a valid price per liter.");
      return;
    }

    const totalAmount = (stock.quantity * parseFloat(pricePerLiter)).toFixed(2);

    try {
      await axios.post('http://localhost:5000/fuelpayments', {
        stockId: stock._id,
        date: stock.date,
        type: stock.type,
        quantity: stock.quantity,
        supplier: stock.supplier,
        amount: totalAmount
      });

      const response = await axios.get(`http://localhost:5000/fuelpayments/stock/${stock._id}`);
      const paymentId = response.data.payment._id;

      alert('Payment recorded successfully!');
      navigate(`/paymentdetails/${paymentId}`);
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to record payment.');
    }
  };

  const handlePayHerePayment = async () => {
    if (!payhereLoaded) {
      alert("PayHere SDK not loaded yet. Please wait.");
      return;
    }
    if (!stock || !pricePerLiter) {
      alert("Please enter a valid price per liter first.");
      return;
    }

    const totalAmount = (stock.quantity * parseFloat(pricePerLiter)).toFixed(2);

    try {
      const hashRes = await axios.post('http://localhost:5000/getPayhereHash', {
        order_id: stock._id,
        amount: totalAmount,
        currency: "LKR"
      });

      const payment = {
        sandbox: true,
        merchant_id: "1231683", 
        return_url: window.location.href,
        cancel_url: window.location.href,
        notify_url: "http://sample.com/notify", 
        order_id: stock._id,
        items: `${stock.type} Fuel`,
        amount: totalAmount,
        currency: "LKR",
        hash: hashRes.data.hash,
        first_name: "Customer",
        last_name: "",
        email: "customer@example.com",
        phone: "0771234567",
        address: "Galle",
        city: "Galle",
        country: "Sri Lanka"
      };

      window.payhere.onCompleted = function(orderId) {
        alert("Payment completed. Order ID: " + orderId);
      };
      window.payhere.onDismissed = function() {
        alert("Payment popup closed.");
      };
      window.payhere.onError = function(error) {
        alert("Payment error: " + error);
      };

      window.payhere.startPayment(payment);

    } catch (err) {
      console.error("Error starting PayHere payment:", err);
      alert("Failed to start PayHere payment.");
    }
  };

  return (
    <div className="p-payment-page"> 
      <img src={logo} alt="Logo" className="payment-logo" />
      <h2>Payment Details</h2>
      <Link to="/admin" className="p-back-link">⬅ Back to Admin</Link>

      {loading ? (
        <p>Loading...</p>
      ) : stock ? (
        <div className="payment-card">
          <p><strong>Date:</strong> {new Date(stock.date).toLocaleDateString()}</p>
          <p><strong>Fuel Type:</strong> {stock.type}</p>
          <p><strong>Quantity:</strong> {stock.quantity} Liters</p>
          <p><strong>Supplier:</strong> {stock.supplier}</p>

          <label><strong>Enter Price per Liter (Rs.):</strong></label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={pricePerLiter}
            onChange={(e) => setPricePerLiter(e.target.value)}
            className="price-input"
            placeholder="e.g., 420.00"
          />

          {pricePerLiter && (
            <p><strong>Total Amount:</strong> Rs. {(stock.quantity * parseFloat(pricePerLiter)).toFixed(2)}</p>
          )}

          <button className="fp-confirm-btn" onClick={handleConfirmPayment}>
            Confirm Payment (Manual)
          </button>

          <button
            className="payhere-btn"
            onClick={handlePayHerePayment}
            style={{ marginTop: "10px", backgroundColor: "#00a403ff", color: "#fff" }}
          >
            Pay with PayHere
          </button>
        </div>
      ) : (
        <p>No stock data found.</p>
      )}
    </div>
  );
}

export default PaymentPage;
