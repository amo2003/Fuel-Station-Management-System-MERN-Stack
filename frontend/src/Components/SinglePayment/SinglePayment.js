import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SinglePayment.css';
import logo from '../../assets/f2.png'; 

function PaymentDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`https://eac34b48-2a45-4b11-86c9-a129e031408d-prod.e1-us-east-azure.choreoapis.dev/fuel/backend/v1.0/fuelpayments/${id}`);
        setPayment(res.data.payment);
        setLoading(false);
      } catch (err) {
        console.error("Fetch payment error:", err);
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  return (
    <div className="payment-details-page">
      <img src={logo} alt="Logo" className="payment-logo" />

      <h2>Payment Successful</h2>
      <Link to="/admin" className="details-back-link">⬅ Admin</Link>

      {loading ? (
        <p>Loading...</p>
      ) : payment ? (
        <div className="payment-details-card">
          <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
          <p><strong>Fuel Type:</strong> {payment.type}</p>
          <p><strong>Quantity:</strong> {payment.quantity} Liters</p>
          <p><strong>Supplier:</strong> {payment.supplier}</p>
          <p><strong>Total Amount:</strong> Rs. {payment.amount.toFixed(2)}</p>
        </div>
      ) : (
        <p>Payment not found.</p>
      )}
    </div>
  );
}

export default PaymentDetails;
